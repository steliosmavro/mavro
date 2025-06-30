'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@repo/ui/components/Button';

export function LogoButton({ className }: { className?: string }) {
    const { theme } = useTheme();
    // Fallback to dark if theme is undefined (before hydration)
    const logoSrc =
        theme === 'light' ? '/light-theme-logo.svg' : '/dark-theme-logo.svg';

    return (
        <Button asChild variant="ghost" size="icon" className={className}>
            <Link href="/">
                <Image
                    src={logoSrc}
                    alt="Mavro Logo"
                    height={28}
                    width={28}
                    priority
                    className="p-1"
                />
            </Link>
        </Button>
    );
}
