'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModelType = 'openai' | 'anthropic';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatContextType {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    model: ModelType;
    setModel: (model: ModelType) => void;
    apiKeys: { openai: string; anthropic: string };
    setApiKeys: (keys: { openai: string; anthropic: string }) => void;
    systemPrompt: string;
    setSystemPrompt: (prompt: string) => void;
    temperature: number;
    setTemperature: (temp: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [model, setModel] = useState<ModelType>('openai');
    const [apiKeys, setApiKeys] = useState<{
        openai: string;
        anthropic: string;
    }>({ openai: '', anthropic: '' });
    const [systemPrompt, setSystemPrompt] = useState('');
    const [temperature, setTemperature] = useState(1);

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                model,
                setModel,
                apiKeys,
                setApiKeys,
                systemPrompt,
                setSystemPrompt,
                temperature,
                setTemperature: (value) => {
                    console.log(value);
                    return setTemperature(value);
                },
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChat must be used within a ChatProvider');
    return ctx;
}
