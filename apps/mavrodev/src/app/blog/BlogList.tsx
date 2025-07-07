'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    Tag,
    Search,
    BookOpen,
    Sparkles,
    TrendingUp,
    Zap,
    Filter,
} from 'lucide-react';
import { Card } from '@repo/ui/components/Card';
import { Badge } from '@repo/ui/components/Badge';
import { Button } from '@repo/ui/components/Button';
import { Input } from '@repo/ui/components/Input';
import Link from 'next/link';
import React from 'react';
import type { BlogPost } from '../../../lib/getBlogPosts';

interface BlogListProps {
    posts: BlogPost[];
}

const tagColors: Record<string, string> = {
    AI: 'from-purple-400 to-pink-600',
    TypeScript: 'from-blue-400 to-cyan-600',
    React: 'from-cyan-400 to-blue-600',
    'Next.js': 'from-gray-600 to-black',
    'Developer Tools': 'from-orange-400 to-red-600',
    Automation: 'from-green-400 to-emerald-600',
    Web3: 'from-yellow-400 to-orange-600',
    Performance: 'from-red-400 to-pink-600',
};

export default function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
    const [hoveredPost, setHoveredPost] = React.useState<string | null>(null);

    const allTags = React.useMemo(() => {
        const tags = new Set<string>();
        posts.forEach((post) => {
            post.tags?.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags);
    }, [posts]);

    const filteredPosts = React.useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                post.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase()),
                );

            const matchesTag = !selectedTag || post.tags?.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    const featuredPost = posts[0];
    const regularPosts = filteredPosts.slice(
        featuredPost && !searchQuery && !selectedTag ? 1 : 0,
    );

    return (
        <main className="min-h-screen">
            {/* Hero Section with Animated Background */}
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-float" />
                    <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-float-delayed" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                            className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 mb-6"
                        >
                            <BookOpen className="h-8 w-8 text-primary" />
                        </motion.div>

                        <h1 className="text-5xl md:text-[3.75rem] font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Thoughts & Insights
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Deep dives into AI, developer tools, automation, and
                            the art of building exceptional software.
                        </p>
                    </motion.div>

                    {/* Search and Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="relative max-w-xl mx-auto w-full">
                            <div className="relative group">
                                <Search className="absolute z-1 left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="search"
                                    placeholder="Search posts by title, content, or tags..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-12 pr-4 h-12 w-full bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50 transition-all duration-200 text-base"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <Button
                                variant={
                                    selectedTag === null ? 'default' : 'outline'
                                }
                                size="sm"
                                onClick={() => setSelectedTag(null)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                All Posts
                            </Button>
                            {allTags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={
                                        selectedTag === tag
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => setSelectedTag(tag)}
                                    className="hover:scale-105 transition-transform"
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="px-4 pt-12 pb-24">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Featured Post */}
                    {featuredPost && !searchQuery && !selectedTag && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-16"
                        >
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <Card className="relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative p-8 md:p-12">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Badge
                                                variant="default"
                                                className="bg-gradient-to-r from-purple-500 to-pink-500"
                                            >
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                Featured
                                            </Badge>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(
                                                        featuredPost.date,
                                                    ).toLocaleDateString(
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
                                                    {featuredPost.readingTime}
                                                </span>
                                            </div>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                                            {featuredPost.summary}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {featuredPost.tags?.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                >
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    )}

                    {/* Regular Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {regularPosts.map((post, index) => {
                                const tagColor =
                                    tagColors[post.tags?.[0] || ''] ||
                                    'from-gray-400 to-gray-600';
                                const isHovered = hoveredPost === post.slug;

                                return (
                                    <motion.div
                                        key={post.slug}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                        }}
                                        onHoverStart={() =>
                                            setHoveredPost(post.slug)
                                        }
                                        onHoverEnd={() => setHoveredPost(null)}
                                    >
                                        <Link href={`/blog/${post.slug}`}>
                                            <Card className="h-full group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                                <div
                                                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tagColor}`}
                                                />

                                                <div className="p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <motion.div
                                                            animate={{
                                                                rotate: isHovered
                                                                    ? 360
                                                                    : 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.5,
                                                            }}
                                                            className={`p-2 rounded-lg bg-gradient-to-br ${tagColor} text-white`}
                                                        >
                                                            {index % 3 === 0 ? (
                                                                <Zap className="h-5 w-5" />
                                                            ) : index % 3 ===
                                                              1 ? (
                                                                <TrendingUp className="h-5 w-5" />
                                                            ) : (
                                                                <Sparkles className="h-5 w-5" />
                                                            )}
                                                        </motion.div>

                                                        <span className="text-sm text-muted-foreground">
                                                            {post.readingTime}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                                        {post.summary}
                                                    </p>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">
                                                            {new Date(
                                                                post.date,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>

                                                        <div className="flex gap-1">
                                                            {post.tags
                                                                ?.slice(0, 2)
                                                                .map((tag) => (
                                                                    <Badge
                                                                        key={
                                                                            tag
                                                                        }
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-muted-foreground mb-4">
                                No posts found matching your criteria.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedTag(null);
                                }}
                            >
                                Clear filters
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>
        </main>
    );
}
