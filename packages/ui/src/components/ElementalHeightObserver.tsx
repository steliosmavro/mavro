'use client';

import { useEffect } from 'react';

type ElementHeightObserverProps = {
    selector: string; // e.g. 'header', 'footer', '.my-class'
    cssVar: string; // e.g. '--header-height', '--footer-height'
};

export function ElementHeightObserver({
    selector,
    cssVar,
}: ElementHeightObserverProps) {
    useEffect(() => {
        const el = document.querySelector(selector);
        const setHeight = () => {
            if (el) {
                document.documentElement.style.setProperty(
                    cssVar,
                    `${el.getBoundingClientRect().height}px`,
                );
            }
        };

        setHeight();
        const observer = new ResizeObserver(setHeight);
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, [selector, cssVar]);

    return null;
}
