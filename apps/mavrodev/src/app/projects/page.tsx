'use client';

import { motion } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Star,
    Award,
    Brain,
    Cpu,
    GitBranch,
    TrendingUp,
    Bot,
    BarChart3,
    Zap,
    Code2,
} from 'lucide-react';
import { Badge } from '@repo/ui/components/Badge';
import { Button } from '@repo/ui/components/Button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@repo/ui/components/Card';
import { getOriginFor } from '@repo/ui/lib/utils';
import React from 'react';

type ProjectCategory = 'featured' | 'ai-ml' | 'web3' | 'systems' | 'oss';

interface Project {
    title: string;
    subtitle: string;
    description: string;
    longDescription?: string;
    tech: string[];
    repo?: string;
    demo?: string;
    category: ProjectCategory;
    icon: React.ElementType;
    highlight?: boolean;
    badge?: string;
    impact?: string;
    year?: string;
}

const projects: Project[] = [
    {
        title: 'MavroChat',
        subtitle: 'AI Chat Platform for Developers',
        description:
            'Developer-first AI workspace with streaming Markdown, model switching, and tool invocation.',
        longDescription:
            'Built a comprehensive AI chat platform tailored for developers, featuring real-time streaming responses, multiple AI model support, and integrated developer tools.',
        tech: ['TypeScript', 'React', 'Next.js', 'AI/LLM', 'Tailwind'],
        repo: 'https://github.com/steliosmavro/mavro',
        demo: `${getOriginFor('mavrochat')}/landing`,
        category: 'featured',
        icon: Brain,
        highlight: true,
        impact: 'Active product in development',
    },
    {
        title: 'EzPump Bot',
        subtitle: 'Telegram Trading Bot (Acquired)',
        description:
            'Automated trading bot for Solana meme coins with 1.2K active users. Successfully acquired by MicroPump.',
        longDescription:
            'Developed a sophisticated Telegram bot for automated cryptocurrency trading on Solana blockchain. Achieved significant user adoption and successful exit.',
        tech: ['TypeScript', 'Telegram API', 'Solana', 'Web3.js', 'Node.js'],
        repo: 'https://github.com/steliosmavro/pump-fun-telegram-bot',
        demo: 'https://www.micropump.fun',
        category: 'web3',
        icon: TrendingUp,
        badge: 'Acquired',
        impact: '1.2K active users',
    },
    {
        title: 'Earthquake Prediction System',
        subtitle: 'M.Sc. Thesis - ML/DL Research',
        description:
            'Advanced ML/DL system for predicting earthquakes ≥6.5 magnitude in Greece using historical seismic data.',
        longDescription:
            'Developed a comprehensive machine learning pipeline combining traditional ML algorithms with deep learning models for earthquake prediction. Achieved significant accuracy improvements over baseline methods.',
        tech: [
            'Python',
            'TensorFlow',
            'Scikit-learn',
            'Time Series',
            'Research',
        ],
        repo: 'https://github.com/steliosmavro/earthquake-prediction',
        category: 'ai-ml',
        icon: BarChart3,
        impact: 'Academic research publication',
        year: '2023',
    },
    {
        title: 'Pump Fun Comment Bot',
        subtitle: 'Advanced Automation System',
        description:
            'Sophisticated automation bot with anti-detection, proxy management, and account rotation capabilities.',
        longDescription:
            'Built a highly scalable automation system featuring advanced anti-detection mechanisms, distributed proxy management, and intelligent account rotation strategies.',
        tech: [
            'TypeScript',
            'NestJS',
            'Proxy Management',
            'Automation',
            'Node.js',
        ],
        repo: 'https://github.com/steliosmavro/pump-fun-comment-bot',
        category: 'systems',
        icon: Bot,
        impact: 'High-volume automation',
    },
    {
        title: 'Parallel K-NN Classifier',
        subtitle: 'High-Performance Computing',
        description:
            'Parallel implementation of K-Nearest Neighbors using Pthreads for efficient multi-core processing.',
        longDescription:
            'Implemented a highly optimized parallel version of the K-NN algorithm, achieving significant speedup on multi-core systems through efficient thread management and data partitioning.',
        tech: [
            'C',
            'Pthreads',
            'Parallel Computing',
            'Machine Learning',
            'Algorithms',
        ],
        repo: 'https://github.com/steliosmavro/parallel-knn',
        category: 'systems',
        icon: Cpu,
        impact: '8x speedup on 8-core systems',
    },
    {
        title: 'Nango Integrations',
        subtitle: 'Open Source Contributions',
        description:
            "Multiple contributions to Nango's unified API platform, including new integrations and core improvements.",
        longDescription:
            'Contributed several integrations and improvements to Nango, a popular open-source platform for building native integrations. Focus on API design and developer experience.',
        tech: ['TypeScript', 'APIs', 'OAuth', 'Developer Tools', 'OSS'],
        repo: 'https://github.com/pulls?q=is%3Apr+author%3Asteliosmavro+org%3ANangoHQ',
        demo: 'https://www.nango.dev',
        category: 'oss',
        icon: GitBranch,
        impact: 'Used by 1000+ developers',
    },
    {
        title: 'Stock Market Predictor',
        subtitle: 'Financial ML Pipeline',
        description:
            'Custom ML pipeline for intraday S&P 500 predictions with real-time data processing.',
        longDescription:
            'Developed an end-to-end machine learning pipeline for stock market prediction, featuring real-time data ingestion, feature engineering, and ensemble models.',
        tech: [
            'Python',
            'Machine Learning',
            'Financial APIs',
            'Pandas',
            'Real-time',
        ],
        repo: 'https://github.com/steliosmavro/stock-prediction',
        category: 'ai-ml',
        icon: Zap,
        year: '2022',
    },
];

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
};

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = React.useState<
        ProjectCategory | 'all'
    >('all');
    const [hoveredProject, setHoveredProject] = React.useState<string | null>(
        null,
    );

    const filteredProjects =
        selectedCategory === 'all'
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    const projectsByCategory = React.useMemo(() => {
        const grouped: Record<ProjectCategory, Project[]> = {
            featured: [],
            'ai-ml': [],
            web3: [],
            systems: [],
            oss: [],
        };

        projects.forEach((project) => {
            grouped[project.category].push(project);
        });

        return grouped;
    }, []);

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
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Projects & Work
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            A collection of my technical projects spanning
                            AI/ML, blockchain, systems programming, and open
                            source contributions.
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
                                {projects.length}
                            </Badge>
                        </Button>
                        {Object.entries(categoryConfig).map(([key, config]) => {
                            const count =
                                projectsByCategory[key as ProjectCategory]
                                    .length;
                            const Icon =
                                projects.find((p) => p.category === key)
                                    ?.icon || Code2;
                            return (
                                <Button
                                    key={key}
                                    variant={
                                        selectedCategory === key
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() =>
                                        setSelectedCategory(
                                            key as ProjectCategory,
                                        )
                                    }
                                    className="group"
                                >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {config.label}
                                    {count > 0 && (
                                        <Badge
                                            variant="secondary"
                                            className="ml-2"
                                        >
                                            {count}
                                        </Badge>
                                    )}
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
                            const Icon = project.icon;
                            const isHovered = hoveredProject === project.title;

                            return (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    onHoverStart={() =>
                                        setHoveredProject(project.title)
                                    }
                                    onHoverEnd={() => setHoveredProject(null)}
                                    className={`group ${project.highlight ? 'md:col-span-2' : ''}`}
                                >
                                    <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                                        {/* Gradient border effect on hover */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${categoryConfig[project.category].color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                        />

                                        <CardHeader className="relative">
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className={`p-3 rounded-lg bg-gradient-to-br ${categoryConfig[project.category].color} text-white`}
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
                                            </div>

                                            <h3 className="text-2xl font-bold mb-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {project.subtitle}
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
                                                {project.tech.map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex gap-3">
                                            {project.demo && (
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-1.5"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                            {project.repo && (
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
                        I&apos;m always interested in working on innovative
                        projects and contributing to open source.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild size="lg">
                            <a href="/contact">Get in Touch</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a
                                href="https://github.com/steliosmavro"
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
