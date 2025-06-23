'use client';
import { Input } from '@repo/ui/components/input';
import { Button } from '@repo/ui/components/button';
import { useState } from 'react';
import { useChat, ChatMessage } from '../context/ChatContext';

export default function ChatInput() {
    const { messages, setMessages, model, apiKeys, systemPrompt, temperature } =
        useChat();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg: ChatMessage = { role: 'user', content: input };
        setMessages([...messages, userMsg]);
        setInput('');
        setLoading(true);
        const endpoint =
            model === 'openai' ? '/api/chat/openai' : '/api/chat/anthropic';
        const apiKey = model === 'openai' ? apiKeys.openai : apiKeys.anthropic;
        const body =
            model === 'openai'
                ? {
                      messages: [...messages, userMsg],
                      apiKey,
                      model: 'gpt-3.5-turbo',
                      systemPrompt,
                      temperature,
                  }
                : {
                      messages: [...messages, userMsg],
                      apiKey,
                      model: 'claude-3-opus-20240229',
                      systemPrompt,
                      temperature,
                  };
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.body) throw new Error('No response body');
            const reader = res.body.getReader();
            let assistantMsg = '';
            let done = false;
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk
                        .split('\n')
                        .filter((line) => line.startsWith('data: '));
                    for (const line of lines) {
                        const data = line.replace('data: ', '').trim();
                        if (data === '[DONE]' || !data) continue;
                        try {
                            const parsed = JSON.parse(data);
                            let content = '';
                            if (model === 'openai') {
                                content =
                                    parsed.choices?.[0]?.delta?.content || '';
                            } else if (model === 'anthropic') {
                                if (
                                    parsed.type === 'content_block_delta' &&
                                    parsed.delta?.text
                                ) {
                                    content = parsed.delta.text;
                                }
                            }
                            if (content) {
                                assistantMsg += content;
                                setMessages((msgs: ChatMessage[]) => {
                                    const filtered = msgs.filter(
                                        (m, i) =>
                                            i !== msgs.length - 1 ||
                                            m.role !== 'assistant',
                                    );
                                    return [
                                        ...filtered,
                                        {
                                            role: 'assistant',
                                            content: assistantMsg,
                                        } as ChatMessage,
                                    ];
                                });
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
        } catch (err) {
            setMessages((msgs: ChatMessage[]) => [
                ...msgs,
                {
                    role: 'assistant',
                    content: `[Error: ${
                        err instanceof Error ? err.message : 'Unknown error'
                    }]`,
                } as ChatMessage,
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSend} className="w-full">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInput(e.target.value)
                    }
                    disabled={loading}
                    className="flex-1"
                />
                <Button type="submit" disabled={loading || !input.trim()}>
                    Send
                </Button>
            </div>
        </form>
    );
}
