'use client';
import { ThemeProvider } from '@repo/ui/components/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
