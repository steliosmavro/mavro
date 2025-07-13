'use client';

import { motion } from 'framer-motion';
import { Button } from '@repo/ui/components';
import { Calendar, MessageCircle } from 'lucide-react';

export default function BookMeetingPage() {
    const openChat = () => {
        // Find and click the chat widget button - it's the floating button with MessageCircle icon
        const chatButtons = document.querySelectorAll('button');
        const chatButton = Array.from(chatButtons).find(
            (button) =>
                button.querySelector('svg.lucide-message-circle') &&
                button.classList.contains('fixed'),
        );

        if (chatButton) {
            chatButton.click();

            // Wait for chat to open, then populate the input
            setTimeout(() => {
                const chatInput = document.querySelector(
                    'textarea[placeholder*="Type your message"]',
                ) as HTMLTextAreaElement;
                if (chatInput) {
                    chatInput.value = "I'd like to schedule a meeting with you";
                    chatInput.dispatchEvent(
                        new Event('input', { bubbles: true }),
                    );
                    // Focus the input so user can just hit enter
                    chatInput.focus();
                }
            }, 500);
        }
    };

    return (
        <div className="container max-w-4xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8"
            >
                {/* Calendar icon with slash through it */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="relative inline-block"
                >
                    <Calendar className="w-32 h-32 text-muted-foreground/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-1 bg-destructive rotate-45" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Book a Meeting
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 text-lg text-muted-foreground"
                >
                    <p className="text-xl">
                        What, did you expect a manual calendar widget?
                    </p>
                    <p className="text-2xl font-semibold text-foreground">
                        What year is it? 2020?? 🤨
                    </p>
                    <p className="mt-8">
                        Go ahead and use my{' '}
                        <span className="text-primary font-semibold">
                            AI Assistant
                        </span>{' '}
                        to schedule a meeting with me!
                    </p>
                    <p className="text-base">
                        It knows my availability and can book time directly on
                        my calendar.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    className="pt-8"
                >
                    <Button
                        size="lg"
                        onClick={openChat}
                        className="gap-2 text-lg px-8 py-6"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Open AI Assistant
                    </Button>
                </motion.div>
            </motion.div>

            {/* Fun facts while they wait */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-20 p-6 bg-muted/50 rounded-lg"
            >
                <h2 className="text-lg font-semibold mb-3">
                    Why AI scheduling is better:
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                    <li>✅ No back-and-forth emails about availability</li>
                    <li>✅ Instant confirmation with calendar invite</li>
                    <li>✅ Works in any timezone (AI handles conversion)</li>
                    <li>✅ You can ask questions while scheduling</li>
                    <li>✅ It&apos;s just cooler 😎</li>
                </ul>
            </motion.div>
        </div>
    );
}
