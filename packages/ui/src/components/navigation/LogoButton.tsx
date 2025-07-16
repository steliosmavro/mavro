'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '../form/Button';
import { useState, useEffect } from 'react';

export function LogoButton({
    className,
    lightLogoSrc,
    darkLogoSrc,
    href = '/',
}: {
    className?: string;
    lightLogoSrc: string;
    darkLogoSrc: string;
    href?: string;
}) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering theme-specific content after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Use dark logo as default until we know the actual theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const logoSrc =
        mounted && currentTheme === 'light' ? lightLogoSrc : darkLogoSrc;
    const isExternal = href.startsWith('http');

    return (
        <Button asChild variant="ghost" size="icon" className={className}>
            <Link
                href={href}
                {...(isExternal && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                })}
            >
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
