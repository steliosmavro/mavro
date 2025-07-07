'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { getPrimarySkills } from '@/lib/resumeHelpers';
import { Mail, FileText, Code2, Sparkles, Rocket } from 'lucide-react';
import { Badge, Button } from '@repo/ui/components';
import React from 'react';

export function HeroSection() {
    return (
        <section className="mt-24 w-full max-w-6xl mx-auto px-4 relative">
            <HeroBackgroundEffects />
            <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-center lg:justify-between">
                <HeroContent />
                <HeroImage />
            </div>
        </section>
    );
}

function HeroBackgroundEffects() {
    return (
        <>
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
        </>
    );
}

function HeroContent() {
    return (
        <motion.div
            className="flex flex-1 flex-col gap-8 text-left lg:items-start lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <HeroTitle />
            <HeroRoles />
            <HeroBio />
            <HeroSkills />
            <HeroActions />
        </motion.div>
    );
}

function HeroTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <span className="text-sm font-medium text-muted-foreground mb-2 block">
                👋&nbsp;&nbsp;Welcome, I&apos;m
            </span>
            <h1 className="gradient-text mb-4">{resumeData.personal.name}</h1>
        </motion.div>
    );
}

function HeroRoles() {
    const roles = [
        { text: 'Full-Stack Engineer', icon: Code2 },
        { text: 'AI Integrations', icon: Sparkles },
        { text: 'Developer Tooling', icon: Rocket },
    ];

    return (
        <motion.div
            className="flex flex-wrap gap-2 font-mono text-sm md:text-base uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {roles.map((item, idx) => (
                <React.Fragment key={idx}>
                    <motion.span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.text}
                    </motion.span>
                    {idx < roles.length - 1 && (
                        <span className="text-muted-foreground/50 self-center">
                            •
                        </span>
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    );
}

function HeroBio() {
    return (
        <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            {resumeData.summary.bio}
        </motion.p>
    );
}

function HeroSkills() {
    return (
        <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {getPrimarySkills().map((skill, idx) => (
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
    );
}

function HeroActions() {
    return (
        <motion.nav
            className="mt-12 flex flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <Button asChild size="lg" className="group">
                <Link href="/projects" className="flex items-center gap-2">
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
            <Button variant="outline" size="lg" asChild className="group">
                <Link href="/contact" className="flex items-center gap-2">
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
    );
}

function HeroImage() {
    return (
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
                alt="Stylianos Mavrokoukoulakis - Full-Stack Engineer"
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
    );
}
