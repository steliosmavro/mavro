interface RateLimitStore {
    [key: string]: number[];
}

const store: RateLimitStore = {};

export function rateLimit(
    identifier: string,
    limit: number = 10,
    windowMs: number = 60 * 1000, // 1 minute
): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Initialize or get existing timestamps
    if (!store[identifier]) {
        store[identifier] = [];
    }

    // Remove old timestamps outside the window
    store[identifier] = store[identifier].filter(
        (timestamp) => timestamp > windowStart,
    );

    // Check if limit exceeded
    if (store[identifier].length >= limit) {
        return false;
    }

    // Add current timestamp
    store[identifier].push(now);
    return true;
}

export function getRateLimitHeaders(
    identifier: string,
    limit: number = 10,
    windowMs: number = 60 * 1000,
): Record<string, string> {
    const now = Date.now();
    const windowStart = now - windowMs;
    const timestamps = store[identifier] || [];
    const validTimestamps = timestamps.filter(
        (timestamp) => timestamp > windowStart,
    );
    const remaining = Math.max(0, limit - validTimestamps.length);
    const resetTime =
        validTimestamps.length > 0
            ? Math.ceil((validTimestamps[0]! + windowMs) / 1000)
            : Math.ceil((now + windowMs) / 1000);

    return {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
    };
}
