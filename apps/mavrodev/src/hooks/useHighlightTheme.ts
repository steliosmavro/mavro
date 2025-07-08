import { useTheme } from 'next-themes';
import { useHighlightTheme as useHighlightThemeBase } from '@repo/hooks';

export function useHighlightTheme() {
    const { theme, resolvedTheme } = useTheme();
    useHighlightThemeBase({ theme, resolvedTheme });
}
