// import { getPostMeta } from '../../..//lib/getBlogPosts';
// import type { Metadata } from 'next';
import { TypographyH1, TypographyP } from '@repo/ui/components/Typography';
import { Card, CardContent } from '@repo/ui/components/Card';

// export async function generateMetadata({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//     const { slug } = await params;
//     const meta = getPostMeta(slug);
//     if (!meta) return {};
//     return {
//         title: meta.title,
//         description: meta.summary,
//         openGraph: {
//             title: meta.title,
//             description: meta.summary,
//             type: 'article',
//             url: `https://mavro.dev/blog/${slug}`,
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: meta.title,
//             description: meta.summary,
//         },
//         alternates: {
//             canonical: `https://mavro.dev/blog/${slug}`,
//         },
//     };
// }

export default function BlogPostPage() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center">
            <Card className="flex flex-col items-center gap-4 px-10 py-16">
                <CardContent className="flex flex-col items-center gap-4">
                    <span className="text-5xl">🚧</span>
                    <TypographyH1 className="mb-2 text-2xl font-bold text-brand">
                        Coming Soon
                    </TypographyH1>
                    <TypographyP className="max-w-xs text-center text-slate-600">
                        Blog posts will be available soon. Check back for
                        updates!
                    </TypographyP>
                </CardContent>
            </Card>
        </main>
    );
}
