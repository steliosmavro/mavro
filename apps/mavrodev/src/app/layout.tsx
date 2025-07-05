import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getOriginFor } from '@repo/ui/lib/utils';
import Link from 'next/link';
import '@repo/ui/globals.css';
import { ThemeProvider } from '@repo/ui/components/ThemeProvider';
import { ThemeToggle } from '@repo/ui/components/ThemeToggle';
import { Header } from '@repo/ui/components/Header';
import './globals.css';
import { Button } from '@repo/ui/components/Button';
import { ElementHeightObserver } from '@repo/ui/components/ElementalHeightObserver';
import { LogoButton } from '@repo/ui/components/LogoButton';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const origin = getOriginFor('mavrodev');

export const metadata: Metadata = {
    title: 'Stelios Mavro | Full-Stack Engineer',
    description:
        'Personal website of Stelios Mavro — Full-Stack Engineer focused on AI integrations and developer tooling.',
    metadataBase: new URL(origin),
    openGraph: {
        title: 'Stelios Mavro | Full-Stack Engineer',
        description:
            'Personal website of Stelios Mavro — Full-Stack Engineer focused on AI integrations and developer tooling.',
        url: origin,
        siteName: new URL(origin).hostname,
        type: 'website',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
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
                                    <Link href="/contact">Contact</Link>
                                </Button>
                                <Button asChild variant="link">
                                    <Link
                                        href="/resume.pdf"
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
                                <a href="mailto:stelios@mavro.dev">Email</a>
                            </Button>
                            <Button asChild variant="link">
                                <a
                                    href="https://www.linkedin.com/in/steliosmavro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </Button>
                            <Button asChild variant="link">
                                <a
                                    href="https://x.com/mavrodev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                </a>
                            </Button>
                        </nav>
                        <div>
                            &copy; {new Date().getFullYear()} Stelios Mavro. All
                            rights reserved.
                        </div>
                    </footer>
                </ThemeProvider>
            </body>
        </html>
    );
}
