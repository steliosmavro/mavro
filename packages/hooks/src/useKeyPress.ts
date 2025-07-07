import { useEffect, useCallback, useState } from 'react';

/**
 * Custom hook for detecting when a specific key is pressed
 * @param targetKey - The key to listen for (e.g., 'Enter', 'Escape', 'k')
 * @param handler - Optional callback to execute when key is pressed
 * @param options - Options for the event listener
 * @returns boolean indicating if the key is currently pressed
 */
export function useKeyPress(
    targetKey: string,
    handler?: (event: KeyboardEvent) => void,
    options?: {
        preventDefault?: boolean;
        stopPropagation?: boolean;
        ctrlKey?: boolean;
        metaKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
    },
): boolean {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === targetKey || event.code === targetKey) {
                // Check modifier keys if specified
                if (options?.ctrlKey && !event.ctrlKey) return;
                if (options?.metaKey && !event.metaKey) return;
                if (options?.shiftKey && !event.shiftKey) return;
                if (options?.altKey && !event.altKey) return;

                if (options?.preventDefault) {
                    event.preventDefault();
                }
                if (options?.stopPropagation) {
                    event.stopPropagation();
                }

                setKeyPressed(true);
                handler?.(event);
            }
        },
        [targetKey, handler, options],
    );

    const upHandler = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === targetKey || event.code === targetKey) {
                setKeyPressed(false);
            }
        },
        [targetKey],
    );

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [downHandler, upHandler]);

    return keyPressed;
}
