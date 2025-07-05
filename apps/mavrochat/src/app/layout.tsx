import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@repo/ui/globals.css';
import './globals.css';
import { Providers } from '../providers';
import { Header } from '@repo/ui/components/Header';
import { ThemeToggle } from '@repo/ui/components/ThemeToggle';
import { ConditionalModelSelector } from '../components/ConditionalModelSelector';
import { LogoButton } from '@repo/ui/components/LogoButton';
import { getOriginFor } from '@repo/ui/lib/utils';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const origin = getOriginFor('mavrochat');

export const metadata: Metadata = {
    title: 'Mavro Chat | AI Chat for Developers',
    description:
        'Mavro Chat is an AI-powered chat platform designed for developers. Get instant answers, code help, and AI-powered productivity tools.',
    metadataBase: new URL(origin),
    openGraph: {
        title: 'Mavro Chat | AI Chat for Developers',
        description:
            'Mavro Chat is an AI-powered chat platform designed for developers. Get instant answers, code help, and AI-powered productivity tools.',
        url: origin,
        siteName: new URL(origin).hostname,
        type: 'website',
        images: [
            {
                url: '/dark-theme-logo.svg',
                width: 512,
                height: 512,
                alt: 'Mavro Chat Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mavro Chat | AI Chat for Developers',
        description:
            'Mavro Chat is an AI-powered chat platform designed for developers. Get instant answers, code help, and AI-powered productivity tools.',
        site: '@steliosmavro',
        images: ['/dark-theme-logo.svg'],
    },
    icons: {
        icon: '/tab-icon.svg',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <Providers>
                    <Header className="bg-background border-b xl:bg-transparent xl:border-none">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                                <LogoButton
                                    lightLogoSrc="/light-theme-logo.svg"
                                    darkLogoSrc="/dark-theme-logo.svg"
                                    href={getOriginFor('mavrodev')}
                                />
                                <ConditionalModelSelector />
                            </div>
                            <ThemeToggle />
                        </div>
                    </Header>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
