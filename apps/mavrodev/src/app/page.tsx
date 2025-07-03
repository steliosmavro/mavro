'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@repo/ui/components/Badge';
import { Button } from '@repo/ui/components/Button';

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@repo/ui/components/Card';

export default function Home() {
    return (
        <main className="flex flex-col gap-24 2xl:gap-36">
            {/* Hero Section */}
            <section className="mt-24 w-full lg:max-w-[1200px] lg:mx-auto">
                <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-1 flex-col gap-8 text-left lg:items-start lg:text-left">
                        <h1>Stelios Mavro</h1>
                        <div className="flex flex-wrap gap-1 font-mono text-md uppercase tracking-wider">
                            {[
                                'Full-Stack Engineer',
                                '-',
                                'AI Integrations',
                                '-',
                                'Developer Tooling',
                            ].map((word, idx) =>
                                word === '-' ? (
                                    <span key={idx} className="mx-1">
                                        -
                                    </span>
                                ) : (
                                    <span key={idx} className="inline-block">
                                        {word}
                                    </span>
                                ),
                            )}
                        </div>
                        <p>
                            Full-Stack Engineer since 2020, focused on
                            AI-powered applications, automation, and developer
                            tools.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 ">
                            {[
                                'TypeScript',
                                'Full-Stack Development',
                                'AI Integration',
                                'Dev Tools',
                            ].map((skill) => (
                                <Badge key={skill} variant="outline">
                                    {skill}
                                </Badge>
                            ))}
                        </div>

                        <nav className="mt-12 flex flex-wrap gap-3 sm:gap-4">
                            <Button asChild>
                                <Link href="/projects">Projects</Link>
                            </Button>
                            <Button variant="secondary" asChild>
                                <Link href="/blog">Blog</Link>
                            </Button>
                            <Button variant="secondary" asChild>
                                <Link href="/contact">Contact</Link>
                            </Button>
                            <Button variant="secondary" asChild>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center"
                                >
                                    Resume
                                </a>
                            </Button>
                        </nav>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                        <motion.img
                            src="/business-transparent-bg-cropped.png"
                            alt="Stelios"
                            className="max-w-xs relative z-10 h-auto w-full object-contain"
                            loading="lazy"
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                filter: 'brightness(1.3) saturate(130%)',
                            }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                scale: 1.03,
                                rotate: 3,
                                filter: 'brightness(1.4) saturate(130%)',
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeOut',
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="flex flex-col gap-8 w-full lg:max-w-[1200px] lg:mx-auto">
                <div className="flex">
                    <h2>Featured Projects</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                        {
                            title: 'EzPump - Telegram Trading Bot (Acquired)',
                            desc: 'Built a Telegram-based trading bot for Solana meme coins, enabling volume simulation, auto-commenting, analytics, and pricing packages. Reached 1.2K users and was acquired by MicroPump.',
                            tags: [
                                'Solana',
                                'Telegram Bot',
                                'Blockchain Automation',
                                'TypeScript',
                            ],
                            repo: 'https://github.com/steliosmavro/pump-fun-telegram-bot',
                            redirectTo:
                                'https://t.me/micropump_bot?start=6416185160',
                            visit: 'https://www.micropump.fun',
                        },

                        {
                            title: 'Contributions to Nango (Open Source - Developer Tool)',
                            desc: "Contributed new integrations, multiple features, bug fixes, and improvements across Nango's Dashboard, Server, Connect UI, Integration Templates, and Docs.",
                            tags: [
                                'Open Source',
                                'Developer Tooling',
                                'API Integrations',
                                'Developer Experience',
                            ],
                            repo: 'https://github.com/pulls?q=is%3Apr+author%3Asteliosmavro+org%3ANangoHQ',
                            redirectTo: 'https://www.nango.dev',
                            visit: 'https://www.nango.dev',
                        },
                    ].map((project, i) => (
                        <motion.div
                            key={i}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                key={i}
                                className={`${
                                    project.redirectTo
                                        ? 'cursor-pointer hover:ring-1'
                                        : 'cursor-default'
                                }`}
                                onClick={() =>
                                    project.redirectTo &&
                                    window.open(project.redirectTo, '_blank')
                                }
                            >
                                <CardHeader>
                                    <h3>{project.title}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p>{project.desc}</p>
                                    <ul className="mt-4 flex list-none flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="flex gap-4">
                                    {project.visit && (
                                        <Button asChild>
                                            <a
                                                href={project.visit}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Visit
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="secondary" asChild>
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="h-4 w-4" />
                                            GitHub
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-24 flex flex-col gap-8 w-full lg:max-w-[1200px] lg:mx-auto">
                <div className="flex">
                    <h2>What People Say</h2>
                </div>
                <div className="grid gap-16 sm:grid-cols-2">
                    {[
                        {
                            quote: 'We appreciated how you stepped in with ownership and initiative. You adapted quickly, understood the product, and brought practical solutions.',
                            name: 'David Kamien',
                            title: 'CEO, Mind-Alliance Systems',
                            avatar: '/david-kamien.jpeg',
                            linkedIn: 'https://www.linkedin.com/in/davidkamien',
                        },
                        {
                            quote: 'Thanks a lot for all the help, Stelios! We really noticed your contributions and your proactive attitude. It meant a lot to the team.',
                            name: 'Bastien Beurier',
                            title: 'Co-Founder, Nango · ex-Uber',
                            avatar: '/bastien-beurier.jpg',
                            linkedIn:
                                'https://www.linkedin.com/in/bastienbeurier',
                        },
                        {
                            quote: 'Stelios has that rare mix of professionalism, consistency, and quiet confidence. A pleasure to work with.',
                            name: 'George Tzinos',
                            title: 'Senior Director of Engineering, InstaShop',
                            avatar: '/george-tzinos.jpg',
                            linkedIn: 'https://www.linkedin.com/in/geotzinos',
                        },
                    ].map((t, i) => (
                        <motion.figure
                            key={i}
                            className="p-4 rounded-2xl backdrop-blur-md ease-out"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                        >
                            <a
                                href={t.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <figcaption className=" flex items-center gap-4">
                                    <motion.img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="h-14 w-14 object-cover rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">
                                            {t.name}
                                        </span>
                                        {t.title && (
                                            <span className="text-sm">
                                                {t.title}
                                            </span>
                                        )}
                                    </div>
                                </figcaption>
                            </a>
                            <blockquote>&quot;{t.quote}&quot;</blockquote>
                        </motion.figure>
                    ))}
                </div>
            </section>
        </main>
    );
}
