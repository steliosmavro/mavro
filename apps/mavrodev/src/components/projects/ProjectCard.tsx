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
    Shield,
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
import type { Project } from '@/types/resume';
import {
    getCategoryLabel,
    getCategoryColor,
    getPrimaryCategory,
} from '@/lib/categories';
import { formatPeriod } from '@/lib/dateUtils';

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
    Shield,
};

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const Icon = project.icon ? iconMap[project.icon] || Code2 : Code2;
    const primaryCategory = getPrimaryCategory(project.categories);
    const categoryColor = primaryCategory
        ? getCategoryColor(primaryCategory)
        : 'from-gray-500 to-gray-600';

    const hasExpandableContent =
        (project.highlights && project.highlights.length > 0) ||
        project.longDescription;

    const toggleExpansion = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group break-inside-avoid"
            style={{
                breakInside: 'avoid-column',
                pageBreakInside: 'avoid',
            }}
        >
            <Card
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 ${
                    isHovered ? 'bg-gradient-to-br' : ''
                }`}
            >
                {/* Gradient overlay for hover effect */}
                {isHovered && (
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-10 pointer-events-none`}
                    />
                )}
                <CardHeader>
                    {/* Icon, Name, and Badges on same line */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className={`p-2 rounded-lg bg-gradient-to-br ${categoryColor} text-white`}
                                animate={{
                                    rotate: isHovered ? 360 : 0,
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
                        <span>{formatPeriod(project.period)}</span>
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
                        {project.description}
                    </p>

                    {/* Show More Button - Only show if there are highlights or long description */}
                    {hasExpandableContent && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleExpansion}
                            className="inline-flex items-center gap-2 text-xs"
                        >
                            <span>Show {isExpanded ? 'less' : 'more'}</span>
                            {isExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    )}

                    {/* Expanded Section */}
                    <AnimatePresence>
                        {isExpanded && (
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
                                className="mt-4 space-y-8"
                            >
                                {/* Long Description */}
                                {project.longDescription && (
                                    <p className="text-sm text-muted-foreground">
                                        {project.longDescription}
                                    </p>
                                )}

                                {/* Highlights */}
                                {project.highlights &&
                                    project.highlights.length > 0 && (
                                        <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                                            <h4 className="text-sm font-semibold mb-2">
                                                Key Highlights:
                                            </h4>
                                            <ul className="space-y-1">
                                                {project.highlights.map(
                                                    (highlight, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                                        >
                                                            <span className="text-primary mt-1">
                                                                •
                                                            </span>
                                                            <span>
                                                                {highlight}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                {/* Technologies */}
                                <div className="text-sm text-muted-foreground">
                                    <strong className="font-medium">
                                        Technologies used:
                                    </strong>{' '}
                                    {[
                                        ...project.primaryTech,
                                        ...project.secondaryTech,
                                    ].join(', ')}
                                </div>

                                {/* Categories - Now shown only in expanded view */}
                                <div className="flex flex-wrap gap-1.5">
                                    {project.categories.map((category) => (
                                        <Badge
                                            key={category}
                                            variant="secondary"
                                            className="text-xs px-2 py-0.5"
                                        >
                                            {getCategoryLabel(category)}
                                        </Badge>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="flex gap-3">
                    {project.live && (
                        <Button asChild size="sm" className="flex-1">
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                {project.live.includes('github.com/pulls')
                                    ? 'View PRs'
                                    : 'Visit'}
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
                                onClick={(e) => e.stopPropagation()}
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
}
