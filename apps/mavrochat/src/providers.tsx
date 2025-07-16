'use client';
import { ThemeProvider } from '@repo/ui/components';
import { ModelProvider } from './context/ModelContext';
import { ApiTokenProvider } from './context/ApiTokenContext';
import { sharedConfig } from '@repo/shared-config';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModelProvider>
            <ApiTokenProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={sharedConfig.theme.defaultTheme}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ApiTokenProvider>
        </ModelProvider>
    );
}
