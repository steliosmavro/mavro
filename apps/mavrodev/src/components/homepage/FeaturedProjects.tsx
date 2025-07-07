'use client';

import { motion, useMotionValue, MotionValue } from 'framer-motion';
import { getFeaturedProjects } from '@/lib/resumeHelpers';
import { Github, ExternalLink, Award, Star } from 'lucide-react';
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
import type { Project } from '@/types/resume';

export function FeaturedProjects() {
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
        <section className="flex flex-col gap-12 w-full max-w-6xl mx-auto px-4">
            <FeaturedProjectsHeader />
            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                onMouseMove={handleMouseMove}
            >
                {getFeaturedProjects()
                    .slice(0, 3)
                    .map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={i}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    ))}
            </div>
        </section>
    );
}

function FeaturedProjectsHeader() {
    return (
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
    );
}

interface ProjectCardProps {
    project: Project;
    index: number;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

function ProjectCard({ project, index, mouseX, mouseY }: ProjectCardProps) {
    const mavroChatOrigin =
        project.slug === 'mavrochat' ? getOriginFor('mavrochat') : null;

    const handleCardClick = () => {
        const redirectTo =
            mavroChatOrigin && project.slug === 'mavrochat'
                ? `${mavroChatOrigin}/landing`
                : project.live || project.github;
        if (redirectTo) window.open(redirectTo, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
            }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Card
                className={`h-full cursor-pointer transition-all duration-300 card-glow
                    ${
                        project.featured
                            ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/5'
                            : 'hover:shadow-xl hover:border-primary/20'
                    }`}
                onClick={handleCardClick}
                style={
                    {
                        '--mouse-x': `${mouseX.get()}px`,
                        '--mouse-y': `${mouseY.get()}px`,
                    } as React.CSSProperties
                }
            >
                <ProjectCardHeader project={project} />
                <ProjectCardContent project={project} />
                <ProjectCardFooter project={project} />
            </Card>
        </motion.div>
    );
}

function ProjectCardHeader({ project }: { project: Project }) {
    return (
        <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {project.period}
                    </p>
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
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                </div>
            </div>
        </CardHeader>
    );
}

function ProjectCardContent({ project }: { project: Project }) {
    return (
        <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                    </Badge>
                ))}
            </div>
        </CardContent>
    );
}

function ProjectCardFooter({ project }: { project: Project }) {
    return (
        <CardFooter className="flex gap-3 pt-4">
            {project.live && (
                <Button asChild size="sm" className="flex-1">
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit
                    </a>
                </Button>
            )}
            {project.github && (
                <Button variant="outline" size="sm" asChild className="flex-1">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="h-3.5 w-3.5" />
                        Code
                    </a>
                </Button>
            )}
        </CardFooter>
    );
}
