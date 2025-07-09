import { Geist, Geist_Mono } from 'next/font/google';

// Font configurations
export const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const sharedConfig = {
    social: {
        twitter: '@mavrodev',
        github: 'https://github.com/mavrodev',
        linkedin: 'https://www.linkedin.com/in/mavrodev',
    },
    author: {
        name: 'Stelios Mavro',
        email: 'stelios@mavro.dev',
    },
    seo: {
        twitterCreator: '@mavrodev',
        keywords: [
            'developer',
            'full-stack',
            'react',
            'typescript',
            'nextjs',
            'ai',
            'open source',
        ],
    },
    theme: {
        defaultTheme: 'dark' as const,
        themeColor: '#000000',
    },
    fonts: {
        className: `${geistSans.variable} ${geistMono.variable} antialiased`,
    },
    apps: {
        mavrochat: {
            name: 'Mavro Chat',
            description: 'AI-powered chat platform designed for developers',
            shortDescription: 'AI Chat for Developers',
        },
        mavrodev: {
            name: 'Mavro Dev',
            description: 'Full-stack developer portfolio and blog',
            shortDescription: 'Developer Portfolio',
        },
    },
    api: {
        rateLimit: {
            tiers: {
                anonymous: {
                    requests: 10,
                    window: '24 h',
                },
                authenticated: {
                    requests: 25,
                    window: '24 h',
                },
                premium: {
                    requests: 100,
                    window: '24 h',
                },
            },
            prefix: '@mavrochat/ratelimit',
        },
    },
    cache: {
        maxAge: 31536000, // 1 year in seconds
        staleWhileRevalidate: 86400, // 1 day in seconds
    },
} as const;
