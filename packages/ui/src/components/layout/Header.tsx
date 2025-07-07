'use client';

import { ReactNode } from 'react';

interface HeaderProps {
    className?: string;
    children: ReactNode;
}

export function Header({ className = '', children }: HeaderProps) {
    return (
        <header
            className={`sticky top-0 z-30 w-full flex items-center justify-center py-2 px-4 border border-input bg-background ${className}`.trim()}
        >
            {children}
        </header>
    );
}
