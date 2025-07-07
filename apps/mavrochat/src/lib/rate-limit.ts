import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { sharedConfig } from '@repo/shared-config';

// In-memory rate limiting for development
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

// Check if Redis is available
const redisAvailable = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

export async function checkRateLimit(
    identifier: string,
    tier: 'anonymous' | 'authenticated' | 'premium' = 'anonymous',
) {
    const tierConfig = sharedConfig.api.rateLimit.tiers[tier];

    // If Redis is available, use it
    if (redisAvailable) {
        try {
            // Create a tier-specific rate limiter
            const tierRateLimiter = new Ratelimit({
                redis: Redis.fromEnv(),
                limiter: Ratelimit.slidingWindow(
                    tierConfig.requests,
                    tierConfig.window,
                ),
                analytics: true,
                prefix: `${sharedConfig.api.rateLimit.prefix}:${tier}`,
            });

            const { success, limit, reset, remaining } =
                await tierRateLimiter.limit(identifier);
            return { success, limit, reset, remaining };
        } catch (error) {
            console.error(
                'Redis rate limit error, falling back to in-memory:',
                error,
            );
        }
    }

    // Fallback to in-memory rate limiting for development
    const now = Date.now();
    const windowMs =
        tierConfig.window === '24 h' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
    const limit = tierConfig.requests;

    const tierKey = `${identifier}:${tier}`;
    const record = inMemoryStore.get(tierKey);

    if (!record || now > record.resetTime) {
        // New window
        inMemoryStore.set(tierKey, {
            count: 1,
            resetTime: now + windowMs,
        });
        return {
            success: true,
            limit,
            reset: now + windowMs,
            remaining: limit - 1,
        };
    }

    // Existing window
    if (record.count >= limit) {
        return {
            success: false,
            limit,
            reset: record.resetTime,
            remaining: 0,
        };
    }

    // Increment count
    record.count++;
    return {
        success: true,
        limit,
        reset: record.resetTime,
        remaining: limit - record.count,
    };
}
