'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@repo/data';
import { getProjectBySlug } from '@/lib/resumeHelpers';
import {
    Calendar,
    Clock,
    Tag,
    ArrowLeft,
    Twitter,
    Link as LinkIcon,
    BookOpen,
    ExternalLink,
} from 'lucide-react';
import { Badge, Button, Card } from '@repo/ui/components';
import Link from 'next/link';
import React from 'react';
import { useHighlightTheme } from '@/hooks/useHighlightTheme';
import type { BlogPost } from '../../../lib/getBlogPosts';
import { getCategoryLabel } from '@/lib/categories';

interface BlogPostClientProps {
    post: BlogPost;
    children: React.ReactNode;
}

export default function BlogPostClient({
    post,
    children,
}: BlogPostClientProps) {
    const [copied, setCopied] = React.useState(false);
    useHighlightTheme();

    const shareOnTwitter = () => {
        const twitterHandle =
            resumeData.personal.twitter?.split('/').pop() || 'mavrodev';
        const text = `Check out "${post.title}" by @${twitterHandle}`;
        const url = window.location.href;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank',
        );
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Add smooth scrolling for anchor links
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('.anchor-link');

            if (anchor && anchor instanceof HTMLAnchorElement) {
                e.preventDefault();
                const id = anchor.href.split('#')[1];
                if (id) {
                    const element = document.getElementById(id);

                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        // Update URL without triggering navigation
                        window.history.pushState({}, '', `#${id}`);
                    }
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <article className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Animated background specific to blog posts */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back button */}
                        <Link href="/blog">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mb-8 -ml-2"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>

                        {/* Post metadata */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readingTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {post.content.split(' ').length} words
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        {/* Summary */}
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            {post.summary}
                        </p>

                        {/* Categories and Share */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {post.categories?.map((category) => (
                                    <Badge
                                        key={category}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        <Tag className="h-3 w-3 mr-1" />
                                        {getCategoryLabel(category)}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={shareOnTwitter}
                                    className="group"
                                >
                                    <Twitter className="h-4 w-4 group-hover:text-[#1DA1F2]" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyLink}
                                    className="group"
                                >
                                    {copied ? (
                                        <span className="text-green-600">
                                            Copied!
                                        </span>
                                    ) : (
                                        <LinkIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="prose prose-lg dark:prose-invert max-w-none markdown-content">
                        {children}
                    </div>

                    {/* Related Project */}
                    {post.relatedProject &&
                        (() => {
                            const project = getProjectBySlug(
                                post.relatedProject,
                            );
                            if (!project) return null;

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="mt-12"
                                >
                                    <h3 className="text-xl font-bold mb-4">
                                        Related Project
                                    </h3>
                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-lg font-semibold mb-2">
                                                    {project.name}
                                                </h4>
                                                <p className="text-muted-foreground mb-3">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        ...project.primaryTech,
                                                        ...project.secondaryTech,
                                                    ].map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {project.github && (
                                                    <Button asChild size="sm">
                                                        <a
                                                            href={
                                                                project.github
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1"
                                                        >
                                                            View on GitHub
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    </Button>
                                                )}
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href="/projects"
                                                        className="flex items-center gap-1"
                                                    >
                                                        View Project
                                                        <ExternalLink className="h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })()}

                    {/* Author section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 pt-16 border-t border-border"
                    >
                        <div className="flex items-center gap-6">
                            <motion.img
                                src={resumeData.personal.casualAvatar}
                                alt={resumeData.personal.name}
                                className="w-20 h-20 rounded-full object-cover"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">
                                    {resumeData.personal.name}
                                </h3>
                                <p className="text-muted-foreground mb-3">
                                    {resumeData.summary.headline}
                                </p>
                                <div className="flex gap-3">
                                    <Link href="/contact">
                                        <Button size="sm">Get in Touch</Button>
                                    </Link>
                                    <Link
                                        href={resumeData.personal.github}
                                        target="_blank"
                                    >
                                        <Button variant="outline" size="sm">
                                            Follow on GitHub
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Related posts suggestion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 border border-primary/10"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-center">
                            Continue Reading
                        </h3>
                        <p className="text-center text-muted-foreground mb-6">
                            Check out more articles on AI, developer tools, and
                            software engineering.
                        </p>
                        <div className="text-center">
                            <Link href="/blog">
                                <Button>
                                    View All Posts
                                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </article>
    );
}
