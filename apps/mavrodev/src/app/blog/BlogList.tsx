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
import { Card, Badge, Button, Input } from '@repo/ui/components';
import Link from 'next/link';
import React from 'react';
import type { BlogPost } from '../../../lib/getBlogPosts';
import type { ProjectCategory } from '@/types/resume';
import { getCategoryLabel, getCategoryColor } from '@/lib/categories';

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] =
        React.useState<ProjectCategory | null>(null);
    const [hoveredPost, setHoveredPost] = React.useState<string | null>(null);

    const allCategories = React.useMemo(() => {
        const categories = new Set<ProjectCategory>();
        posts.forEach((post) => {
            post.categories?.forEach((category) => categories.add(category));
        });
        return Array.from(categories);
    }, [posts]);

    const filteredPosts = React.useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                post.categories?.some((category) =>
                    getCategoryLabel(category)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                );

            const matchesCategory =
                !selectedCategory ||
                post.categories?.includes(selectedCategory);

            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory]);

    const featuredPost = posts[0];
    const regularPosts = filteredPosts.slice(
        featuredPost && !searchQuery && !selectedCategory ? 1 : 0,
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
                                    placeholder="Search posts by title, content, or categories..."
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
                                    selectedCategory === null
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(null)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                All Posts
                            </Button>
                            {allCategories.map((category) => (
                                <Button
                                    key={category}
                                    variant={
                                        selectedCategory === category
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className="hover:scale-105 transition-transform"
                                >
                                    {getCategoryLabel(category)}
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
                    {featuredPost && !searchQuery && !selectedCategory && (
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
                                            {featuredPost.categories?.map(
                                                (category) => (
                                                    <Badge
                                                        key={category}
                                                        variant="outline"
                                                    >
                                                        <Tag className="h-3 w-3 mr-1" />
                                                        {getCategoryLabel(
                                                            category,
                                                        )}
                                                    </Badge>
                                                ),
                                            )}
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
                                const categoryColor = post.categories?.[0]
                                    ? getCategoryColor(post.categories[0])
                                    : 'from-gray-400 to-gray-600';
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
                                                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColor}`}
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
                                                            className={`p-2 rounded-lg bg-gradient-to-br ${categoryColor} text-white`}
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
                                                            {post.categories
                                                                ?.slice(0, 2)
                                                                .map(
                                                                    (
                                                                        category,
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                category
                                                                            }
                                                                            variant="outline"
                                                                            className="text-xs"
                                                                        >
                                                                            {getCategoryLabel(
                                                                                category,
                                                                            )}
                                                                        </Badge>
                                                                    ),
                                                                )}
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
                                    setSelectedCategory(null);
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
