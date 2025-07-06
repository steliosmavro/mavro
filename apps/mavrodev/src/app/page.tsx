'use client';

import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Mail,
    FileText,
    Code2,
    Sparkles,
    Rocket,
    Award,
    Star,
    Quote,
} from 'lucide-react';
import { Badge } from '@repo/ui/components/Badge';
import { Button } from '@repo/ui/components/Button';
import { getOriginFor } from '@repo/ui/lib/utils';
import React from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@repo/ui/components/Card';

export default function Home() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [mouseX, mouseY],
    );

    return (
        <main className="flex flex-col gap-32 2xl:gap-40 overflow-x-hidden">
            {/* Hero Section */}
            <section className="mt-24 w-full max-w-6xl mx-auto px-4 relative">
                {/* Background decorations */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl -z-10"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-500 rounded-full blur-3xl -z-10"
                />

                <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <motion.div
                        className="flex flex-1 flex-col gap-8 text-left lg:items-start lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="text-sm font-medium text-muted-foreground mb-2 block">
                                👋&nbsp;&nbsp;Welcome, I&apos;m
                            </span>
                            <h1 className="gradient-text mb-4">
                                Stelios Mavro
                            </h1>
                        </motion.div>

                        <motion.div
                            className="flex flex-wrap gap-2 font-mono text-sm md:text-base uppercase tracking-wider"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {[
                                { text: 'Full-Stack Engineer', icon: Code2 },
                                { text: 'AI Integrations', icon: Sparkles },
                                { text: 'Developer Tooling', icon: Rocket },
                            ].map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <motion.span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <item.icon className="h-3.5 w-3.5" />
                                        {item.text}
                                    </motion.span>
                                    {idx < 2 && (
                                        <span className="text-muted-foreground/50 self-center">
                                            •
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.div>

                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Building AI-powered applications and developer tools
                            since 2020. Passionate about creating seamless
                            experiences that empower developers and drive
                            innovation.
                        </motion.p>

                        <motion.div
                            className="mt-4 flex flex-wrap gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {[
                                'TypeScript',
                                'React/Next.js',
                                'AI/ML Integration',
                                'System Design',
                                'Open Source',
                            ].map((skill, idx) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.5 + idx * 0.05,
                                    }}
                                >
                                    <Badge
                                        variant="outline"
                                        className="px-3 py-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.nav
                            className="mt-12 flex flex-wrap gap-3 sm:gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button asChild size="lg" className="group">
                                <Link
                                    href="/projects"
                                    className="flex items-center gap-2"
                                >
                                    View Projects
                                    <motion.span
                                        className="inline-block"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="group"
                            >
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="h-4 w-4" />
                                    Get in Touch
                                </Link>
                            </Button>
                            <Button variant="ghost" size="lg" asChild>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Resume
                                </a>
                            </Button>
                        </motion.nav>
                    </motion.div>

                    <motion.div
                        className="flex flex-1 items-center justify-center relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        {/* Glow effect behind image */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                                scale: [0.9, 1.1, 0.9],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.img
                            src="/business-transparent-bg-cropped.png"
                            alt="Stelios"
                            className="max-w-xs relative z-10 h-auto w-full object-contain float-animation"
                            loading="lazy"
                            whileHover={{
                                scale: 1.05,
                                rotate: 5,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeOut',
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="flex flex-col gap-12 w-full max-w-6xl mx-auto px-4">
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="gradient-text">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground">
                        A selection of my recent work and contributions
                    </p>
                </motion.div>

                <div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    onMouseMove={handleMouseMove}
                >
                    {(
                        [
                            (() => {
                                const mavroChatOrigin =
                                    getOriginFor('mavrochat');
                                return {
                                    title: 'MavroChat',
                                    subtitle: 'AI Chat for Developers',
                                    desc: 'Developer-first AI chat workspace with streaming Markdown, model selector, and built-in tool invocation.',
                                    tags: [
                                        'AI',
                                        'Chat',
                                        'TypeScript',
                                        'Next.js',
                                    ],
                                    repo: 'https://github.com/steliosmavro/mavro',
                                    redirectTo: `${mavroChatOrigin}/landing`,
                                    visit: `${mavroChatOrigin}/landing`,
                                    highlight: true,
                                    badge: undefined,
                                };
                            })(),
                            {
                                title: 'EzPump',
                                subtitle: 'Telegram Trading Bot (Acquired)',
                                desc: 'Built a trading bot for Solana meme coins with 1.2K users. Successfully acquired by MicroPump.',
                                tags: [
                                    'Solana',
                                    'Telegram',
                                    'Blockchain',
                                    'TypeScript',
                                ],
                                repo: 'https://github.com/steliosmavro/pump-fun-telegram-bot',
                                redirectTo:
                                    'https://t.me/micropump_bot?start=6416185160',
                                visit: 'https://www.micropump.fun',
                                badge: 'Acquired',
                                highlight: false,
                            },
                            {
                                title: 'Nango',
                                subtitle: 'Open Source Contributions',
                                desc: 'Contributed integrations, features, and improvements across Nango&apos;s ecosystem.',
                                tags: ['Open Source', 'APIs', 'DevTools'],
                                repo: 'https://github.com/pulls?q=is%3Apr+author%3Asteliosmavro+org%3ANangoHQ',
                                redirectTo: 'https://www.nango.dev',
                                visit: 'https://www.nango.dev',
                                highlight: false,
                                badge: undefined,
                            },
                        ] as const
                    ).map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <Card
                                className={`h-full cursor-pointer transition-all duration-300 card-glow
                                    ${
                                        project.highlight
                                            ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/5'
                                            : 'hover:shadow-xl hover:border-primary/20'
                                    }`}
                                onClick={() =>
                                    project.redirectTo &&
                                    window.open(project.redirectTo, '_blank')
                                }
                                style={
                                    {
                                        '--mouse-x': `${mouseX.get()}px`,
                                        '--mouse-y': `${mouseY.get()}px`,
                                    } as React.CSSProperties
                                }
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {project.subtitle}
                                            </p>
                                        </div>
                                        {project.badge && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-500/10 text-green-600"
                                            >
                                                <Award className="h-3 w-3 mr-1" />
                                                {project.badge}
                                            </Badge>
                                        )}
                                        {project.highlight && (
                                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground mb-4">
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-3 pt-4">
                                    {project.visit && (
                                        <Button
                                            asChild
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <a
                                                href={project.visit}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-1.5"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                Visit
                                            </a>
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="flex-1"
                                    >
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1.5"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="h-3.5 w-3.5" />
                                            Code
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-32 flex flex-col gap-12 w-full max-w-6xl mx-auto px-4">
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="gradient-text">What People Say</h2>
                    <p className="text-lg text-muted-foreground">
                        Testimonials from colleagues and collaborators
                    </p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            quote: 'We appreciated how you stepped in with ownership and initiative. You adapted quickly, understood the product, and brought practical solutions.',
                            name: 'David Kamien',
                            title: 'CEO, Mind-Alliance Systems',
                            avatar: '/david-kamien.jpeg',
                            linkedIn: 'https://www.linkedin.com/in/davidkamien',
                            color: 'from-blue-500 to-purple-500',
                        },
                        {
                            quote: 'Thanks a lot for all the help, Stelios! We really noticed your contributions and your proactive attitude. It meant a lot to the team.',
                            name: 'Bastien Beurier',
                            title: 'Co-Founder, Nango · ex-Uber',
                            avatar: '/bastien-beurier.jpg',
                            linkedIn:
                                'https://www.linkedin.com/in/bastienbeurier',
                            color: 'from-purple-500 to-pink-500',
                        },
                        {
                            quote: 'Stelios has that rare mix of professionalism, consistency, and quiet confidence. A pleasure to work with.',
                            name: 'George Tzinos',
                            title: 'Senior Director of Engineering, InstaShop',
                            avatar: '/george-tzinos.jpg',
                            linkedIn: 'https://www.linkedin.com/in/geotzinos',
                            color: 'from-pink-500 to-orange-500',
                        },
                    ].map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="group"
                        >
                            <Card className="h-full p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                                <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
                                <blockquote className="text-lg leading-relaxed mb-6">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <a
                                    href={t.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group/link"
                                >
                                    <div className="relative">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${t.color} rounded-full blur-md opacity-0 group-hover/link:opacity-50 transition-opacity`}
                                        />
                                        <motion.img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="h-12 w-12 object-cover rounded-full relative z-10"
                                            whileHover={{ scale: 1.1 }}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold group-hover/link:text-primary transition-colors">
                                            {t.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {t.title}
                                        </span>
                                    </div>
                                </a>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
