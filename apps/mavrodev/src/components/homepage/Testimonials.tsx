'use client';

import { motion } from 'framer-motion';
import { getTestimonials } from '@/lib/resumeHelpers';
import { Quote } from 'lucide-react';
import { Card } from '@repo/ui/components/Card';
import type { Testimonial } from '@/types/resume';

export function Testimonials() {
    return (
        <section className="mb-32 flex flex-col gap-12 w-full max-w-6xl mx-auto px-4">
            <TestimonialsHeader />
            <TestimonialsGrid />
        </section>
    );
}

function TestimonialsHeader() {
    return (
        <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="gradient-text">What People Say</h2>
            <p className="text-lg text-muted-foreground">
                Testimonials from colleagues and collaborators
            </p>
        </motion.div>
    );
}

function TestimonialsGrid() {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {getTestimonials().map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} index={i} />
            ))}
        </div>
    );
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <Card className="h-full p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
                <blockquote className="text-lg leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <TestimonialAuthor testimonial={testimonial} />
            </Card>
        </motion.div>
    );
}

function TestimonialAuthor({ testimonial }: { testimonial: Testimonial }) {
    return (
        <a
            href={testimonial.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group/link"
        >
            <div className="relative">
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradientColor} rounded-full blur-md opacity-0 group-hover/link:opacity-50 transition-opacity`}
                />
                <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 object-cover rounded-full relative z-10"
                    whileHover={{ scale: 1.1 }}
                />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold group-hover/link:text-primary transition-colors">
                    {testimonial.name}
                </span>
                <span className="text-sm text-muted-foreground">
                    {testimonial.title}
                </span>
            </div>
        </a>
    );
}
