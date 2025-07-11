'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '@repo/data';
import { getFAQs, getContactMethods } from '@/lib/resumeHelpers';
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
    AlertCircle,
    CheckCircle,
} from 'lucide-react';
import { Button, Card, Input, Textarea } from '@repo/ui/components';
import React from 'react';

const iconMap = {
    email: Mail,
    github: Github,
    linkedin: Linkedin,
    twitter: Globe,
    website: Globe,
};

const timeZoneInfo = {
    location: resumeData.personal.location,
    timezone: resumeData.personal.timezone,
};

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [currentTime, setCurrentTime] = React.useState<string>('');

    // Update time every second
    React.useEffect(() => {
        const updateTime = () => {
            const time = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Europe/Athens',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            setCurrentTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });

                // Reset success state after 5 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                setError(
                    data.error.message ||
                        'Failed to send message. Please try again.',
                );
            }
        } catch {
            setError(
                'Failed to send message. Please check your connection and try again.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Animated particles background */}
                <div className="absolute inset-0 -z-10">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/20 rounded-full"
                            style={{
                                left: `${(i * 23) % 100}%`,
                                top: `${(i * 31) % 100}%`,
                            }}
                            animate={{
                                x: [0, 100, -50, 0],
                                y: [0, -50, 100, 0],
                            }}
                            transition={{
                                duration: 20 + (i % 10),
                                repeat: Infinity,
                                ease: 'linear',
                                delay: i * 0.2,
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

                        <h1 className="text-5xl md:text-[3.75rem] font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
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
                                        placeholder="Your name"
                                        className="w-full"
                                        disabled={isSubmitting}
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
                                        placeholder="your@email.com"
                                        className="w-full"
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Error message */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive"
                                        >
                                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                            <p className="text-sm">{error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Success message */}
                                <AnimatePresence>
                                    {submitted && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex justify-center items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400"
                                        >
                                            <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">
                                                Message sent successfully!
                                                I&apos;ll get back to you soon.
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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
                                {getContactMethods().map((method, index) => {
                                    const Icon =
                                        iconMap[
                                            method.type as keyof typeof iconMap
                                        ] || Globe;
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
                                            <Card className="p-6 h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 group-hover:-translate-y-1">
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                                />
                                                <div className="flex flex-col items-center text-center gap-4 relative">
                                                    <motion.div
                                                        whileHover={{
                                                            scale: 1.1,
                                                            rotate: 5,
                                                        }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 400,
                                                        }}
                                                        className={`p-4 rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-lg`}
                                                    >
                                                        <Icon className="h-8 w-8" />
                                                    </motion.div>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                            {method.label}
                                                        </p>
                                                        <p className="font-semibold text-base group-hover:text-primary transition-colors break-all">
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
                                {currentTime && (
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <p className="text-sm text-muted-foreground">
                                            Current time in Athens:{' '}
                                            <span className="font-mono font-medium text-primary">
                                                {currentTime}
                                            </span>
                                        </p>
                                    </div>
                                )}
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
                        {getFAQs().map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                                    <h3 className="font-semibold mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {faq.answer}
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
