import { Card, CardContent } from '@repo/ui/components/Card';

export default function ProjectsComingSoon() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center">
            <Card className="flex flex-col items-center gap-4 px-10 py-16">
                <CardContent className="flex flex-col items-center gap-4">
                    <span className="text-5xl">🚧</span>
                    <h1 className="mb-2 text-2xl font-bold text-brand">
                        Coming Soon
                    </h1>
                    <p className="max-w-xs text-center text-slate-600">
                        Projects will be showcased here soon. Stay tuned for
                        updates!
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
