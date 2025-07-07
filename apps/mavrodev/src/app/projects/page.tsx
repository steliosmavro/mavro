'use client';

import { motion } from 'framer-motion';
import {
    Github,
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
import type { Project } from '@/types/resume';

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

const categoryConfig = {
    featured: { label: 'Featured', color: 'from-blue-500 to-purple-500' },
    'ai-ml': {
        label: 'AI & Machine Learning',
        color: 'from-purple-500 to-pink-500',
    },
    web3: { label: 'Web3 & Blockchain', color: 'from-emerald-500 to-teal-500' },
    systems: {
        label: 'Systems & Performance',
        color: 'from-orange-500 to-red-500',
    },
    oss: { label: 'Open Source', color: 'from-cyan-500 to-blue-500' },
    'developer-tools': {
        label: 'Developer Tools',
        color: 'from-yellow-500 to-orange-500',
    },
};

type CategoryType = keyof typeof categoryConfig | 'all';

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] =
        React.useState<CategoryType>('all');
    const [hoveredProject, setHoveredProject] = React.useState<string | null>(
        null,
    );

    const allProjects = getProjects();

    const filteredProjects =
        selectedCategory === 'all'
            ? allProjects
            : selectedCategory === 'featured'
              ? allProjects.filter((p) => p.featured)
              : allProjects.filter((p) => p.category === selectedCategory);

    const projectsByCategory = React.useMemo(() => {
        const grouped: Record<string, Project[]> = {
            featured: [],
            'ai-ml': [],
            web3: [],
            systems: [],
            oss: [],
            'developer-tools': [],
        };

        allProjects.forEach((project) => {
            if (project.featured && grouped.featured) {
                grouped.featured.push(project);
            }
            if (project.category in grouped) {
                const category =
                    grouped[project.category as keyof typeof grouped];
                if (category) {
                    category.push(project);
                }
            }
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
                            Projects & Work
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {resumeData.summary.headline}
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        <Button
                            variant={
                                selectedCategory === 'all'
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => setSelectedCategory('all')}
                            className="group"
                        >
                            <Code2 className="h-4 w-4 mr-2" />
                            All Projects
                            <Badge variant="secondary" className="ml-2">
                                {allProjects.length}
                            </Badge>
                        </Button>
                        {Object.entries(categoryConfig).map(([key, config]) => {
                            const count = projectsByCategory[key]?.length || 0;
                            if (count === 0) return null;

                            return (
                                <Button
                                    key={key}
                                    variant={
                                        selectedCategory === key
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() =>
                                        setSelectedCategory(key as CategoryType)
                                    }
                                    className="group"
                                >
                                    {config.label}
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
                            const categoryColor =
                                categoryConfig[
                                    project.category as keyof typeof categoryConfig
                                ]?.color || 'from-gray-500 to-gray-600';

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
                                    <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                                        {/* Gradient border effect on hover */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                        />

                                        <CardHeader className="relative">
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className={`p-3 rounded-lg bg-gradient-to-br ${categoryColor} text-white`}
                                                    animate={{
                                                        rotate: isHovered
                                                            ? 360
                                                            : 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    <Icon className="h-6 w-6" />
                                                </motion.div>
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
                                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-1">
                                                {project.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {project.period}
                                            </p>
                                            {project.impact && (
                                                <p className="text-sm font-medium text-primary">
                                                    {project.impact}
                                                </p>
                                            )}
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                {isHovered &&
                                                project.longDescription
                                                    ? project.longDescription
                                                    : project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies
                                                    .slice(0, 5)
                                                    .map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                {project.technologies.length >
                                                    5 && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        +
                                                        {project.technologies
                                                            .length - 5}{' '}
                                                        more
                                                    </Badge>
                                                )}
                                            </div>
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
                                                        className="flex items-center justify-center gap-1.5"
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
                                                        className="flex items-center justify-center gap-1.5"
                                                    >
                                                        <Github className="h-3.5 w-3.5" />
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
                                <Github className="h-5 w-5" />
                                Follow on GitHub
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
