'use client';

import { ReactNode } from 'react';

interface HeaderProps {
    className?: string;
    innerClassName?: string;
    maxWidthClass?: string;
    children: ReactNode;
}

export function Header({
    className = '',
    innerClassName = '',
    maxWidthClass = 'lg:max-w-[1200px]',
    children,
}: HeaderProps) {
    return (
        <header
            className={`sticky top-0 z-30 w-full flex items-center justify-between py-2 px-4 border border-input bg-background ${className}`.trim()}
        >
            <div
                className={`w-full flex items-center justify-between ${maxWidthClass} lg:mx-auto ${innerClassName}`.trim()}
            >
                {children}
            </div>
        </header>
    );
}
