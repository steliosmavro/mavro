import { useState, useCallback } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

/**
 * Custom hook for copying text to clipboard
 * @returns An object with copy function, status, and reset function
 */
export function useCopyToClipboard() {
    const [status, setStatus] = useState<CopyStatus>('idle');
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copy = useCallback(async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            setStatus('error');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setStatus('copied');
            setCopiedText(text);

            // Reset status after 2 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 2000);

            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            setStatus('error');

            // Reset status after 2 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 2000);

            return false;
        }
    }, []);

    const reset = useCallback(() => {
        setStatus('idle');
        setCopiedText(null);
    }, []);

    return { copy, status, copiedText, reset };
}
