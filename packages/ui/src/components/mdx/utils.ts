import React, { ReactElement, ReactNode } from 'react';

/**
 * Extracts language from a code element's className
 */
export function extractLanguageFromCodeElement(
    children: ReactNode,
): string | undefined {
    const codeElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === 'code',
    ) as ReactElement<{ className?: string }> | undefined;

    if (!codeElement) return undefined;

    const className = codeElement.props?.className || '';
    const match = /language-(\w+)/.exec(className);
    return match?.[1];
}

/**
 * Common props for pre component overrides
 */
export interface PreComponentProps {
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
}
