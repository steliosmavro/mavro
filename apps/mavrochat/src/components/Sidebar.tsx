'use client';

import { LogoButton } from '@repo/ui/components';

export default function Sidebar() {
    return (
        <aside
            className="flex flex-col border-r p-4 pr-6"
            aria-label="Navigation sidebar"
        >
            <div className="flex items-center gap-2">
                <LogoButton
                    lightLogoSrc="/light-theme-logo.svg"
                    darkLogoSrc="/dark-theme-logo.svg"
                />
                <span className="font-bold text-lg tracking-tight">
                    MavroChat
                </span>
            </div>
        </aside>
    );
}
