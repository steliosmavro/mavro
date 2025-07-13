'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';
import { PortfolioChat } from './PortfolioChat';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Show notification after 3 seconds
        const timer = setTimeout(() => {
            const hasSeenNotification = localStorage.getItem(
                'portfolio-chat-notification-seen',
            );
            if (!hasSeenNotification) {
                setShowNotification(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const dismissNotification = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotification(false);
        localStorage.setItem('portfolio-chat-notification-seen', 'true');
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-full max-w-[400px] sm:right-6"
                    >
                        <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b">
                                <div>
                                    <h3 className="font-semibold">
                                        AI Portfolio Assistant
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Ask about experience or schedule a
                                        meeting
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <PortfolioChat />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showNotification && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: 'spring', duration: 0.4 }}
                        className="fixed bottom-20 right-4 sm:right-6 z-40 max-w-[320px]"
                    >
                        <div className="bg-card border border-border rounded-xl shadow-xl p-5 relative overflow-hidden">
                            {/* Gradient background accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 pointer-events-none" />

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={dismissNotification}
                                className="absolute top-3 right-3 h-7 w-7 hover:bg-muted/80 transition-colors z-20"
                            >
                                <X className="h-4 w-4" />
                            </Button>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-sm">
                                        AI Portfolio Assistant
                                    </h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                    Chat with my AI to learn about my
                                    experience, projects, or schedule a meeting!
                                </p>
                                <div className="flex justify-end">
                                    <span className="text-xs font-medium text-primary">
                                        Ask anything!
                                    </span>
                                </div>
                            </div>

                            {/* Arrow pointing to chat button */}
                            <div className="absolute bottom-[-8px] right-8 w-0 h-0 border-t-[8px] border-t-card border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
                            <div className="absolute bottom-[-9px] right-8 w-0 h-0 border-t-[8px] border-t-border border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'fixed bottom-4 right-4 sm:right-6 z-50',
                    'bg-primary text-primary-foreground rounded-full p-4',
                    'shadow-lg hover:shadow-xl transition-shadow',
                    isOpen && 'hidden',
                )}
            >
                <MessageCircle className="h-6 w-6" />
            </motion.button>
        </>
    );
}
