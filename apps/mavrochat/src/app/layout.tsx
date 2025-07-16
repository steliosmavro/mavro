import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@repo/ui/globals.css';
import './globals.css';
import { Providers } from '../providers';
import { Header, ThemeToggle, LogoButton } from '@repo/ui/components';
import { ConditionalModelSelector } from '../components/ConditionalModelSelector';
import { ApiTokenIndicator } from '../components/ApiTokenIndicator';
import { getOriginFor } from '@repo/ui/lib/utils';
import { sharedConfig } from '@repo/shared-config';
import { Analytics } from '@vercel/analytics/react';

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
    title: `${sharedConfig.apps.mavrochat.name} | ${sharedConfig.apps.mavrochat.shortDescription}`,
    description: sharedConfig.apps.mavrochat.description,
    keywords: [...sharedConfig.seo.keywords],
    metadataBase: new URL(origin),
    openGraph: {
        title: `${sharedConfig.apps.mavrochat.name} | ${sharedConfig.apps.mavrochat.shortDescription}`,
        description: sharedConfig.apps.mavrochat.description,
        url: origin,
        siteName: new URL(origin).hostname,
        type: 'website',
        images: [
            {
                url: '/dark-theme-logo.svg',
                width: 512,
                height: 512,
                alt: `${sharedConfig.apps.mavrochat.name} Logo`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${sharedConfig.apps.mavrochat.name} | ${sharedConfig.apps.mavrochat.shortDescription}`,
        description: sharedConfig.apps.mavrochat.description,
        site: sharedConfig.social.twitter,
        creator: sharedConfig.seo.twitterCreator,
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

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: sharedConfig.theme.themeColor,
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
                    <Header className="bg-background border-b 2xl:bg-transparent 2xl:border-none">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                                <LogoButton
                                    lightLogoSrc="/light-theme-logo.svg"
                                    darkLogoSrc="/dark-theme-logo.svg"
                                    href={getOriginFor('mavrodev')}
                                />
                                <ConditionalModelSelector />
                                <ApiTokenIndicator />
                            </div>
                            <ThemeToggle />
                        </div>
                    </Header>
                    <div className="flex-1 flex flex-col">{children}</div>
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
