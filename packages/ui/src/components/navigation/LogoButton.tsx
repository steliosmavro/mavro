'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '../form/Button';

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
    const { theme } = useTheme();
    const logoSrc = theme === 'light' ? lightLogoSrc : darkLogoSrc;
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
