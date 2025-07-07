import type { NextConfig } from 'next';
import { securityHeaders } from '@repo/shared-config/security';

const nextConfig: NextConfig = {
    transpilePackages: ['@repo/ui'],
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
