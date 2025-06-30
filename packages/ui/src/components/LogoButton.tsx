'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from './Button';

export function LogoButton({
    className,
    lightLogoSrc,
    darkLogoSrc,
}: {
    className?: string;
    lightLogoSrc: string;
    darkLogoSrc: string;
}) {
    const { theme } = useTheme();
    const logoSrc = theme === 'light' ? lightLogoSrc : darkLogoSrc;

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
