import type { ContactMethod } from './types';

export const contactMethods: ContactMethod[] = [
    {
        type: 'email',
        label: 'Email',
        value: 'stelios@mavro.dev',
        href: 'mailto:stelios@mavro.dev',
        color: 'from-blue-400 to-blue-600',
    },
    {
        type: 'github',
        label: 'GitHub',
        value: '@steliosmavro',
        href: 'https://github.com/steliosmavro',
        color: 'from-gray-700 to-gray-900',
    },
    {
        type: 'linkedin',
        label: 'LinkedIn',
        value: 'Stelios Mavro',
        href: 'https://www.linkedin.com/in/steliosmavro',
        color: 'from-blue-500 to-blue-700',
    },
    {
        type: 'twitter',
        label: 'X (Twitter)',
        value: '@mavrodev',
        href: 'https://twitter.com/mavrodev',
        color: 'from-gray-700 to-gray-900',
    },
];
