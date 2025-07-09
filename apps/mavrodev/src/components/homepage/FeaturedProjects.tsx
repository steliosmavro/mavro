'use client';

import { motion } from 'framer-motion';
import { getFeaturedProjects } from '@/lib/resumeHelpers';
import React from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function FeaturedProjects() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="flex flex-col gap-12 w-full max-w-6xl mx-auto px-4">
            <FeaturedProjectsHeader />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {featuredProjects.slice(0, 3).map((project, i) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        index={i}
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
