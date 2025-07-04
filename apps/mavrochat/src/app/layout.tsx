import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@repo/ui/globals.css';
import './globals.css';
import { Providers } from '../providers';
import { Header } from '@repo/ui/components/Header';
import { ThemeToggle } from '@repo/ui/components/ThemeToggle';
import { ModelSelector } from '../components/ModelSelector';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Mavro Chat | AI Chat for Developers',
    description:
        'Mavro Chat is an AI-powered chat platform designed for developers. Get instant answers, code help, and AI-powered productivity tools.',
    metadataBase: new URL('https://mavro.chat'),
    openGraph: {
        title: 'Mavro Chat | AI Chat for Developers',
        description:
            'Mavro Chat is an AI-powered chat platform designed for developers. Get instant answers, code help, and AI-powered productivity tools.',
        url: 'https://mavro.chat',
        siteName: 'mavro.chat',
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
                    <Header>
                        <div className="px-8 flex items-center justify-between w-full max-w-3xl">
                            <ModelSelector />
                            <ThemeToggle />
                        </div>
                    </Header>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
