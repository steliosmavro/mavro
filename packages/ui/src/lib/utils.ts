import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getOriginFor(app: 'mavrodev' | 'mavrochat') {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

    // Production URLs
    const prod: Record<typeof app, string> = {
        mavrodev: 'https://mavro.dev',
        mavrochat: 'https://mavro.chat',
    } as const;

    // Local development URLs (make sure ports align with your local setup)
    const dev: Record<typeof app, string> = {
        mavrodev: 'http://localhost:3000',
        mavrochat: 'http://localhost:3001',
    } as const;

    return env === 'development' ? dev[app] : prod[app];
}
