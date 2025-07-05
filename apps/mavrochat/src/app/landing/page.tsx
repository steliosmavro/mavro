'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@repo/ui/components/Button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/Card';
import { ChevronsDown } from 'lucide-react';
import { useRef } from 'react';

export default function LandingPage() {
    const features = [
        {
            title: 'Model Selector',
            description:
                'Swap between AI models on the fly so you’re ready for every new release.',
        },
        {
            title: 'Markdown & Code',
            description:
                'Streaming responses with syntax-highlighted code blocks you can copy in one click.',
        },
        {
            title: 'Built-in Tools',
            description:
                'Instant function calling for weather, unit conversion, and any custom logic you add.',
        },
        {
            title: 'Open Source',
            description:
                'Self-host or embed the chat engine directly in your own apps.',
        },
    ];

    const useCases = [
        {
            title: 'Debug in real-time',
            description:
                'Paste stack traces or error messages and get step-by-step fixes instantly.',
        },
        {
            title: 'Generate boilerplate',
            description:
                'Spin up tests, docs, or CRUD snippets without leaving the chat.',
        },
        {
            title: 'Learn new APIs',
            description:
                'Ask for examples in your favourite stack and get annotated responses you can copy-paste.',
        },
        {
            title: 'Brainstorm features',
            description:
                'Whiteboard ideas with an AI sounding board that speaks code.',
        },
    ];

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start end', 'end start'],
    });
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const ctaTranslate = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);

    return (
        <main className="flex flex-col items-center gap-24 py-24 px-4">
            {/* Hero */}
            <section
                ref={heroRef}
                className="relative flex flex-col items-center gap-8 text-center max-w-3xl"
            >
                {/* Decorative gradient blobs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl -z-10"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-gradient-to-tr from-sky-500 via-teal-500 to-lime-500 rounded-full blur-3xl -z-10"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-5xl font-bold bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                    MavroChat
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className="text-xl text-muted-foreground"
                >
                    Developer-first AI chat workspace — your always-on pair
                    programmer.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                    <Button asChild size="lg">
                        <Link href="/">Get started</Link>
                    </Button>
                </motion.div>
                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: indicatorOpacity }}
                    className="scroll-indicator mt-8"
                >
                    <ChevronsDown className="h-8 w-8 text-muted-foreground" />
                </motion.div>
            </section>

            {/* Features */}
            <section className="grid gap-6 sm:grid-cols-2 max-w-4xl w-full">
                {features.map((feature, idx) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ scale: 1.04 }}
                        className="gradient-border"
                    >
                        <Card className="h-full transition-transform bg-background/60 backdrop-blur-md border-none">
                            <CardHeader>
                                <h3>{feature.title}</h3>
                            </CardHeader>
                            <CardContent>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </section>

            {/* Use Cases */}
            <section className="flex flex-col gap-8 items-center max-w-4xl w-full">
                <h2 className="text-3xl font-semibold">Use Cases</h2>
                <div className="grid gap-6 sm:grid-cols-2 w-full">
                    {useCases.map((uc, idx) => (
                        <motion.div
                            key={uc.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            className="gradient-border"
                        >
                            <Card className="bg-background/60 backdrop-blur-md border-none">
                                <CardHeader>
                                    <h3>{uc.title}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p>{uc.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative flex flex-col items-center gap-6 mt-16">
                {/* Gradient blob behind CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.25, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full blur-3xl -z-10"
                />
                <h2 className="text-3xl font-semibold text-center">
                    Ready to super-charge your workflow?
                </h2>
                <Button asChild size="lg">
                    <Link href="/">Start chatting now</Link>
                </Button>
            </section>

            {/* FAQ */}
            <section className="relative flex flex-col gap-8 items-center max-w-4xl w-full pt-24 pb-32">
                {/* Gradient blob behind FAQ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500 via-cyan-500 to-teal-400 rounded-full blur-3xl -z-10"
                />
                <h2 className="text-3xl font-semibold">FAQ</h2>
                <div className="flex flex-col gap-4 w-full">
                    {[
                        {
                            q: 'Is MavroChat free?',
                            a: 'Yes, MavroChat is completely open-source. You can self-host or use the public instance for free.',
                        },
                        {
                            q: 'Which AI models are supported?',
                            a: 'Currently GPT-4o. More models (Anthropic, Gemini, Llama) are on the roadmap and the selector is future-proof.',
                        },
                        {
                            q: 'Can I add my own tools?',
                            a: 'Absolutely. Wire in any function with Zod validation via a simple TypeScript API.',
                        },
                    ].map(({ q, a }) => (
                        <details
                            key={q}
                            className="gradient-border rounded-lg overflow-hidden"
                        >
                            <summary className="cursor-pointer select-none px-6 py-4 font-medium bg-background/60 backdrop-blur-md">
                                {q}
                            </summary>
                            <div className="px-6 pb-4 pt-2 text-muted-foreground text-sm leading-relaxed bg-background/40 backdrop-blur-md">
                                {a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* Sticky CTA (mobile) */}
            <motion.div
                style={{ translateY: ctaTranslate }}
                className="fixed bottom-4 inset-x-4 lg:hidden z-30"
            >
                <Card className="flex justify-between items-center p-4 backdrop-blur-md bg-background/80 shadow-xl">
                    <span className="font-medium">Start chatting with AI</span>
                    <Button asChild size="sm">
                        <Link href="/">Open Chat</Link>
                    </Button>
                </Card>
            </motion.div>
        </main>
    );
}
