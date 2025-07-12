'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';
import { PortfolioChat } from './PortfolioChat';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

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
                                        Chat with my Portfolio
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Ask about my experience
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
