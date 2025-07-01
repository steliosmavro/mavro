import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useHighlightTheme() {
    const { theme, resolvedTheme } = useTheme();

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        // Remove any existing highlight theme
        const existingTheme = document.querySelector(
            'link[data-highlight-theme]',
        );
        if (existingTheme) {
            existingTheme.remove();
        }

        // Determine which theme to load
        const currentTheme = resolvedTheme || theme;
        const themeFile =
            currentTheme === 'dark' ? 'github-dark.css' : 'github.css';

        // Create and append new theme link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFile}`;
        link.setAttribute('data-highlight-theme', currentTheme || 'light');

        // Add error handling
        link.onerror = () => {
            console.warn(`Failed to load highlight.js theme: ${themeFile}`);
        };

        // Add to head
        document.head.appendChild(link);

        // Cleanup function
        return () => {
            const themeLink = document.querySelector(
                'link[data-highlight-theme]',
            );
            if (themeLink) {
                themeLink.remove();
            }
        };
    }, [theme, resolvedTheme]);
}
