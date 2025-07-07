/**
 * Shared configuration that can be used across both MavroChat and MavroDev
 * This ensures consistency across the monorepo
 */

export const sharedConfig = {
    social: {
        twitter: '@steliosmavro',
        github: 'https://github.com/steliosmavro',
        linkedin: 'https://www.linkedin.com/in/steliosmavro',
    },
    author: {
        name: 'Stelios Mavro',
        email: 'stelios@mavro.dev',
    },
    seo: {
        twitterCreator: '@steliosmavro',
    },
} as const;
