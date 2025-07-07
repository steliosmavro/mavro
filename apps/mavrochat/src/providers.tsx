'use client';
import { ThemeProvider } from '@repo/ui/components';
import { ModelProvider } from './context/ModelContext';
import { sharedConfig } from '@repo/shared-config';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModelProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme={sharedConfig.theme.defaultTheme}
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ModelProvider>
    );
}
