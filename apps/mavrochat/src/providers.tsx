'use client';
import { ThemeProvider } from '@repo/ui/components/ThemeProvider';
import { ModelProvider } from './context/ModelContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModelProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ModelProvider>
    );
}
