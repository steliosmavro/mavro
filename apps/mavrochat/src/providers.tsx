'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<
    | {
          theme: ThemeType;
          setTheme: (theme: ThemeType) => void;
      }
    | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>('dark');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
