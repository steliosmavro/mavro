import type { Metadata } from 'next';
import { getOriginFor } from '@repo/ui/lib/utils';
import Link from 'next/link';
import '@repo/ui/globals.css';
import {
    ThemeProvider,
    ThemeToggle,
    Header,
    Button,
    LogoButton,
    ElementHeightObserver,
} from '@repo/ui/components';
import './globals.css';
import { resumeData } from '@repo/data';
import { sharedConfig } from '@repo/shared-config';
import { Analytics } from '@vercel/analytics/react';
import { ChatWidget } from '@/components/portfolio-chat/ChatWidget';

const origin = getOriginFor('mavrodev');

export const metadata: Metadata = {
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.summary.headline,
    metadataBase: new URL(origin),
    openGraph: {
        title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
        description: resumeData.summary.headline,
        url: origin,
        siteName: new URL(origin).hostname,
        type: 'website',
        images: [
            {
                url: '/dark-theme-logo.svg',
                width: 512,
                height: 512,
                alt: 'Mavro Dev Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
        description: resumeData.summary.headline,
        site: sharedConfig.social.twitter,
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
            <body className={sharedConfig.fonts.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={sharedConfig.theme.defaultTheme}
                    disableTransitionOnChange
                >
                    <ElementHeightObserver
                        selector="header"
                        cssVar="--header-height"
                    />
                    <ElementHeightObserver
                        selector="footer"
                        cssVar="--footer-height"
                    />
                    <Header className="bg-background/60 backdrop-blur-xs">
                        <div className="flex items-center justify-between w-full max-w-6xl">
                            <nav className="flex items-center">
                                <LogoButton
                                    className="mr-2"
                                    lightLogoSrc="/light-theme-logo.svg"
                                    darkLogoSrc="/dark-theme-logo.svg"
                                />
                                <Button asChild variant="link">
                                    <Link href="/projects">Projects</Link>
                                </Button>
                                <Button asChild variant="link">
                                    <Link href="/blog">Blog</Link>
                                </Button>
                                <Button asChild variant="link">
                                    <Link href="/book">Book</Link>
                                </Button>
                                <Button asChild variant="link">
                                    <Link href="/contact">Contact</Link>
                                </Button>
                                <Button asChild variant="link">
                                    <Link
                                        href="/resume-comprehensive.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Resume
                                    </Link>
                                </Button>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </Header>
                    {children}
                    <footer className="flex flex-col gap-8 text-center text-xs pt-8 pb-4 px-4 border-t border-input bg-background">
                        <nav className="flex justify-center text-sm">
                            <Button asChild variant="link">
                                <a href={`mailto:${resumeData.personal.email}`}>
                                    Email
                                </a>
                            </Button>
                            <Button asChild variant="link">
                                <a
                                    href={resumeData.personal.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </Button>
                            <Button asChild variant="link">
                                <a
                                    href={`https://twitter.com/${sharedConfig.social.twitter.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                </a>
                            </Button>
                        </nav>
                        <div>
                            &copy; {new Date().getFullYear()}{' '}
                            {resumeData.personal.name}. All rights reserved.
                        </div>
                    </footer>
                    <ChatWidget />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
