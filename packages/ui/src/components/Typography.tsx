import * as React from 'react';

export function TypographyH1({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance"
            {...props}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            {...props}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
            {...props}
        >
            {children}
        </h3>
    );
}

export function TypographyH4({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            {...props}
        >
            {children}
        </h4>
    );
}

export function TypographyP({
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
            {children}
        </p>
    );
}

export function TypographyBlockquote({
    children,
    ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
            {children}
        </blockquote>
    );
}

export function TypographyTable({
    children,
    ...props
}: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="my-6 w-full overflow-y-auto">
            <table className="w-full" {...props}>
                {children}
            </table>
        </div>
    );
}

export function TypographyUl({
    children,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
            {children}
        </ul>
    );
}

export function TypographyInlineCode({
    children,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <code
            className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
            {...props}
        >
            {children}
        </code>
    );
}

export function TypographyLead({
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className="text-muted-foreground text-xl" {...props}>
            {children}
        </p>
    );
}

export function TypographyLarge({
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="text-lg font-semibold" {...props}>
            {children}
        </div>
    );
}

export function TypographySmall({
    children,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <small className="text-sm leading-none font-medium" {...props}>
            {children}
        </small>
    );
}

export function TypographyMuted({
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className="text-muted-foreground text-sm" {...props}>
            {children}
        </p>
    );
}
