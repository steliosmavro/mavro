'use client';

import { useEffect, useState } from 'react';

export default function TestCSSVars() {
    const [cssVars, setCssVars] = useState<Record<string, string>>({});

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        const vars = {
            '--background': computedStyle.getPropertyValue('--background'),
            '--foreground': computedStyle.getPropertyValue('--foreground'),
            '--border': computedStyle.getPropertyValue('--border'),
            '--muted': computedStyle.getPropertyValue('--muted'),
            '--muted-foreground':
                computedStyle.getPropertyValue('--muted-foreground'),
            '--primary': computedStyle.getPropertyValue('--primary'),
            '--primary-foreground': computedStyle.getPropertyValue(
                '--primary-foreground',
            ),
        };

        setCssVars(vars);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">CSS Variables Test</h1>

            <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">
                        CSS Variable Values:
                    </h2>
                    <pre className="text-sm">
                        {JSON.stringify(cssVars, null, 2)}
                    </pre>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold mb-2">
                        Test Elements:
                    </h2>
                    <div className="p-4 bg-background border border-border rounded">
                        bg-background with border-border
                    </div>
                    <div className="p-4 bg-muted text-muted-foreground rounded">
                        bg-muted with text-muted-foreground
                    </div>
                    <div className="p-4 bg-primary text-primary-foreground rounded">
                        bg-primary with text-primary-foreground
                    </div>
                </div>
            </div>
        </div>
    );
}
