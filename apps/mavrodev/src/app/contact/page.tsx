'use client';

import { motion } from 'framer-motion';
import {
    Mail,
    Github,
    Linkedin,
    MapPin,
    Globe,
    Send,
    Calendar,
    Clock,
    MessageSquare,
    Sparkles,
} from 'lucide-react';
import { Button } from '@repo/ui/components/Button';
import { Card } from '@repo/ui/components/Card';
import { Input } from '@repo/ui/components/Input';
import { Textarea } from '@repo/ui/components/Textarea';
import React from 'react';

interface ContactMethod {
    icon: React.ElementType;
    label: string;
    value: string;
    href: string;
    color: string;
}

const contactMethods: ContactMethod[] = [
    {
        icon: Mail,
        label: 'Email',
        value: 'stelios@mavro.dev',
        href: 'mailto:stelios@mavro.dev',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Github,
        label: 'GitHub',
        value: '@steliosmavro',
        href: 'https://github.com/steliosmavro',
        color: 'from-gray-700 to-gray-900',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'Stelios Mavrokoukoulakis',
        href: 'https://www.linkedin.com/in/steliosmavro',
        color: 'from-blue-600 to-blue-800',
    },
    {
        icon: Globe,
        label: 'Website',
        value: 'mavro.dev',
        href: 'https://mavro.dev',
        color: 'from-purple-500 to-pink-500',
    },
];

const timeZoneInfo = {
    location: 'Athens, Greece',
    timezone: 'EET (UTC+2) / EEST (UTC+3)',
    currentTime: new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Athens',
        hour: '2-digit',
        minute: '2-digit',
    }),
};

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, you would send the email here
        console.log('Form submitted:', formData);

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Animated particles background */}
                <div className="absolute inset-0 -z-10">
                    {typeof window !== 'undefined' &&
                        [...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                                initial={{
                                    x:
                                        Math.random() *
                                        (typeof window !== 'undefined'
                                            ? window.innerWidth
                                            : 1000),
                                    y:
                                        Math.random() *
                                        (typeof window !== 'undefined'
                                            ? window.innerHeight
                                            : 800),
                                }}
                                animate={{
                                    x:
                                        Math.random() *
                                        (typeof window !== 'undefined'
                                            ? window.innerWidth
                                            : 1000),
                                    y:
                                        Math.random() *
                                        (typeof window !== 'undefined'
                                            ? window.innerHeight
                                            : 800),
                                }}
                                transition={{
                                    duration: Math.random() * 20 + 10,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        ))}
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="inline-flex p-4 rounded-full bg-primary/10 mb-6"
                        >
                            <MessageSquare className="h-8 w-8 text-primary" />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Let&apos;s Connect
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Whether you have a project in mind, want to
                            collaborate, or just want to say hello, I&apos;d
                            love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 pb-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl" />

                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Send className="h-6 w-6 text-primary" />
                                Send a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                        className="w-full resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full group"
                                    disabled={isSubmitting || submitted}
                                >
                                    {submitted ? (
                                        <>
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Message Sent!
                                        </>
                                    ) : isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                                className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Quick Contact Methods */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                Quick Links
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contactMethods.map((method, index) => {
                                    const Icon = method.icon;
                                    return (
                                        <motion.a
                                            key={method.label}
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.4 + index * 0.1,
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group"
                                        >
                                            <Card className="p-4 h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                                />
                                                <div className="flex items-center gap-4 relative">
                                                    <div
                                                        className={`p-2 rounded-lg bg-gradient-to-br ${method.color} text-white`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {method.label}
                                                        </p>
                                                        <p className="font-medium group-hover:text-primary transition-colors">
                                                            {method.value}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Location & Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    Location & Availability
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{timeZoneInfo.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{timeZoneInfo.timezone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            Available for freelance projects
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground">
                                        Current time in Athens:{' '}
                                        <span className="font-mono font-medium">
                                            {timeZoneInfo.currentTime}
                                        </span>
                                    </p>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Response Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-green-500/10">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            Quick Response
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            I typically respond within 24 hours.
                                            For urgent matters, please mention
                                            it in your message.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                q: 'What types of projects do you work on?',
                                a: 'I work on full-stack web applications, AI integrations, developer tools, and technical consulting projects.',
                            },
                            {
                                q: 'Are you available for freelance work?',
                                a: "Yes! I'm open to freelance projects. Let's discuss your needs and see how I can help.",
                            },
                            {
                                q: "What's your preferred tech stack?",
                                a: "TypeScript, React/Next.js, Node.js, and Python for AI/ML. But I'm always open to using the right tool for the job.",
                            },
                            {
                                q: 'Do you work with startups?',
                                a: 'Absolutely! I love working with startups and helping them build MVPs and scale their technical infrastructure.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                                    <h3 className="font-semibold mb-2">
                                        {faq.q}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {faq.a}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
