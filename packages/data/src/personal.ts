import type { PersonalInfo, Social } from './types';

export const personalInfo: PersonalInfo = {
    name: 'Stelios Mavro',
    title: 'Full-Stack Engineer - AI Integrations - Developer Tooling',
    location: 'Athens, Greece',
    mobile: '+30 6976750964',
    email: 'stelios@mavro.dev',
    website: 'https://mavro.dev',
    linkedin: 'https://www.linkedin.com/in/steliosmavro',
    github: 'https://github.com/steliosmavro',
    twitter: 'https://twitter.com/mavrodev',
    avatar: '/business-transparent-bg-cropped.png',
    casualAvatar: '/casual.jpg',
    timezone: 'Europe/Athens',
};

export const socials: Social[] = [
    {
        platform: 'github',
        url: 'https://github.com/steliosmavro',
        username: 'steliosmavro',
    },
    {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/steliosmavro',
        username: 'steliosmavro',
    },
    {
        platform: 'twitter',
        url: 'https://twitter.com/mavrodev',
        username: 'mavrodev',
    },
    {
        platform: 'email',
        url: 'mailto:stelios@mavro.dev',
        username: 'stelios@mavro.dev',
    },
    {
        platform: 'website',
        url: 'https://mavro.dev',
    },
];

export const author = {
    name: personalInfo.name,
    email: personalInfo.email,
};

export const summary = {
    headline:
        'Full-Stack Engineer building AI-powered applications and developer tools',
    bio: 'Full-stack engineer since 2020, specializing in AI integrations and developer tooling. Passionate about open-source, clean code, and creating seamless experiences that empower developers.',
    bioExtension:
        'Built MavroChat (ChatGPT clone for developers), created and sold high-impact Telegram trading bot (EzPump) serving 1.2K+ users, contributed to Nango (popular open-source developer tool), and delivered enterprise SaaS at scale. Turning complex ideas into elegant solutions.',
    availability:
        'Available for full-time, part-time, and freelance collaborations.',
    startYear: 2020,
};
