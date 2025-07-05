'use client';

import { usePathname } from 'next/navigation';
import { ModelSelector } from './ModelSelector';

export function ConditionalModelSelector() {
    const pathname = usePathname();

    // Do not render the model selector on landing or any marketing pages
    const hideOnLanding =
        pathname === '/landing' || pathname.startsWith('/landing/');

    if (hideOnLanding) {
        return null;
    }

    return <ModelSelector />;
}
