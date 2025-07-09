'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2 as GithubIcon,
    ExternalLink,
    Star,
    Award,
    MessageSquare,
    Palette,
    GitPullRequest,
    Bot,
    Building2,
    FileText,
    Brain,
    Code2,
    Sparkles,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@repo/ui/components';
import React from 'react';
import { resumeData } from '@/data/resume';
import { getProjects } from '@/lib/resumeHelpers';
import type { Project, ProjectCategory } from '@/types/resume';
import {
    getCategoryLabel,
    getCategoryColor,
    getPrimaryCategory,
} from '@/lib/categories';

// Icon mapping for projects
const iconMap: Record<string, React.ElementType> = {
    MessageSquare,
    Palette,
    GitPullRequest,
    Bot,
    Building2,
    FileText,
    Brain,
    Code2,
    Sparkles,
};

type FilterType = ProjectCategory | 'all' | 'featured';

export default function ProjectsPage() {
    const [selectedFilter, setSelectedFilter] =
        React.useState<FilterType>('all');
    const [hoveredProject, setHoveredProject] = React.useState<string | null>(
        null,
    );
    const [expandedProjects, setExpandedProjects] = React.useState<Set<string>>(
        new Set(),
    );

    const allProjects = getProjects();

    const toggleProjectExpansion = (slug: string) => {
        setExpandedProjects((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(slug)) {
                newSet.delete(slug);
            } else {
                newSet.add(slug);
            }
            return newSet;
        });
    };

    // Get all unique categories
    const allCategories = React.useMemo(() => {
        const categories = new Set<ProjectCategory>();
        allProjects.forEach((project) => {
            project.categories.forEach((cat) => categories.add(cat));
        });
        return Array.from(categories).sort();
    }, [allProjects]);

    const filteredProjects =
        selectedFilter === 'all'
            ? allProjects
            : selectedFilter === 'featured'
              ? allProjects.filter((p) => p.featured)
              : allProjects.filter((p) =>
                    p.categories.includes(selectedFilter as ProjectCategory),
                );

    const projectsByCategory = React.useMemo(() => {
        const grouped: Record<ProjectCategory | 'featured', Project[]> = {
            featured: [],
            'ai-ml': [],
            web3: [],
            'developer-tools': [],
            'open-source': [],
            automation: [],
            website: [],
            contributions: [],
        };

        allProjects.forEach((project) => {
            if (project.featured) {
                grouped.featured.push(project);
            }
            project.categories.forEach((cat) => {
                if (cat in grouped) {
                    grouped[cat].push(project);
                }
            });
        });

        return grouped;
    }, [allProjects]);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-[3.75rem] font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Projects
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {resumeData.summary.headline}
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        <Button
                            variant={
                                selectedFilter === 'all' ? 'default' : 'outline'
                            }
                            onClick={() => setSelectedFilter('all')}
                            className="group"
                        >
                            <Code2 className="h-4 w-4 mr-2" />
                            All Projects
                            <Badge variant="secondary" className="ml-2">
                                {allProjects.length}
                            </Badge>
                        </Button>
                        <Button
                            variant={
                                selectedFilter === 'featured'
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => setSelectedFilter('featured')}
                            className="group"
                        >
                            <Star className="h-4 w-4 mr-2" />
                            Featured
                            <Badge variant="secondary" className="ml-2">
                                {projectsByCategory.featured.length}
                            </Badge>
                        </Button>
                        {allCategories.map((category) => {
                            const count =
                                projectsByCategory[category]?.length || 0;
                            if (count === 0) return null;

                            return (
                                <Button
                                    key={category}
                                    variant={
                                        selectedFilter === category
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() => setSelectedFilter(category)}
                                    className="group"
                                >
                                    {getCategoryLabel(category)}
                                    <Badge variant="secondary" className="ml-2">
                                        {count}
                                    </Badge>
                                </Button>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-4 pb-24">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        layout
                    >
                        {filteredProjects.map((project, index) => {
                            const Icon = project.icon
                                ? iconMap[project.icon] || Code2
                                : Code2;
                            const isHovered = hoveredProject === project.name;
                            const isExpanded = expandedProjects.has(
                                project.slug,
                            );
                            const primaryCategory = getPrimaryCategory(
                                project.categories,
                            );
                            const categoryColor = primaryCategory
                                ? getCategoryColor(primaryCategory)
                                : 'from-gray-500 to-gray-600';

                            return (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    onHoverStart={() =>
                                        setHoveredProject(project.name)
                                    }
                                    onHoverEnd={() => setHoveredProject(null)}
                                    className={`group ${project.featured ? 'md:col-span-2' : ''}`}
                                >
                                    <Card
                                        className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 ${isHovered ? 'bg-gradient-to-br' : ''}`}
                                    >
                                        {/* Gradient overlay for hover effect */}
                                        {isHovered && (
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-10 pointer-events-none`}
                                            />
                                        )}
                                        <CardHeader>
                                            {/* Icon, Name, and Badges on same line */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className={`p-2 rounded-lg bg-gradient-to-br ${categoryColor} text-white`}
                                                        animate={{
                                                            rotate: isHovered
                                                                ? 360
                                                                : 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.5,
                                                        }}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </motion.div>
                                                    <h3 className="text-xl font-bold">
                                                        {project.name}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {project.acquired && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-green-500/10 text-green-600"
                                                        >
                                                            <Award className="h-3 w-3 mr-1" />
                                                            Acquired
                                                        </Badge>
                                                    )}
                                                    {project.featured && (
                                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <span>{project.period}</span>
                                                {project.impact && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="font-medium text-primary">
                                                            {project.impact}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                {isHovered &&
                                                project.longDescription
                                                    ? project.longDescription
                                                    : project.description}
                                            </p>

                                            {/* Technologies - Combined primary and secondary */}
                                            <div className="text-sm text-muted-foreground mb-3">
                                                <span className="font-medium">
                                                    Built with:
                                                </span>{' '}
                                                {[
                                                    ...project.primaryTech,
                                                    ...project.secondaryTech,
                                                ].join(', ')}
                                            </div>

                                            {/* Categories with outline style */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {project.categories.map(
                                                    (category) => (
                                                        <Badge
                                                            key={category}
                                                            variant="outline"
                                                            className="text-xs px-2 py-0.5"
                                                        >
                                                            {getCategoryLabel(
                                                                category,
                                                            )}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>

                                            {/* Show More Button - Only show if there are highlights */}
                                            {project.highlights &&
                                                project.highlights.length >
                                                    0 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleProjectExpansion(
                                                                project.slug,
                                                            );
                                                        }}
                                                        className="w-full justify-between text-xs"
                                                    >
                                                        <span>
                                                            Show{' '}
                                                            {isExpanded
                                                                ? 'less'
                                                                : 'highlights'}
                                                        </span>
                                                        {isExpanded ? (
                                                            <ChevronUp className="h-3.5 w-3.5" />
                                                        ) : (
                                                            <ChevronDown className="h-3.5 w-3.5" />
                                                        )}
                                                    </Button>
                                                )}

                                            {/* Highlights Section */}
                                            <AnimatePresence>
                                                {isExpanded &&
                                                    project.highlights && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: 'auto',
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                            }}
                                                            className="mt-4"
                                                        >
                                                            <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                                                                <h4 className="text-sm font-semibold mb-2">
                                                                    Key
                                                                    Highlights:
                                                                </h4>
                                                                <ul className="space-y-1">
                                                                    {project.highlights.map(
                                                                        (
                                                                            highlight,
                                                                            idx,
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="text-sm text-muted-foreground flex items-start gap-2"
                                                                            >
                                                                                <span className="text-primary mt-1">
                                                                                    •
                                                                                </span>
                                                                                <span>
                                                                                    {
                                                                                        highlight
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                            </AnimatePresence>
                                        </CardContent>

                                        <CardFooter className="flex gap-3">
                                            {project.live && (
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                            {project.github && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    className="flex-1"
                                                >
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <GithubIcon className="h-3.5 w-3.5" />
                                                        View Code
                                                    </a>
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-muted-foreground">
                                No projects found in this category.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-primary/20"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Let&apos;s Build Something Together
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        {resumeData.summary.availability}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild size="lg">
                            <a href="/contact">Get in Touch</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a
                                href={resumeData.personal.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <GithubIcon className="h-5 w-5" />
                                Follow on GitHub
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
