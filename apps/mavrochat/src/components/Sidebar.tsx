'use client';
import { Card } from '@repo/ui/components/Card';
import { Input } from '@repo/ui/components/Input';
import { Textarea } from '@repo/ui/components/Textarea';
import { useChat } from '../context/ChatContext';
import { useEffect } from 'react';
import { LogoButton } from '@repo/ui/components/LogoButton';

export default function Sidebar() {
    const {
        model,
        setModel,
        apiKeys,
        setApiKeys,
        systemPrompt,
        setSystemPrompt,
        temperature,
        setTemperature,
    } = useChat();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const envKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
            if (envKey && !apiKeys.openai) {
                setApiKeys({ ...apiKeys, openai: envKey });
            }
        }
    });

    return (
        <aside className="flex flex-col gap-4 p-4 w-80 min-h-screen bg-muted/40 border-r">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <LogoButton
                        lightLogoSrc="/light-theme-logo.svg"
                        darkLogoSrc="/dark-theme-logo.svg"
                    />
                    <span className="font-bold text-lg tracking-tight">
                        mavro.chat
                    </span>
                </div>
            </div>
            <Card className="mb-2 p-4">
                <div className="font-semibold mb-2">Model Selection</div>
                <select
                    className="w-full rounded border px-3 py-2 bg-background text-foreground"
                    value={model}
                    onChange={(e) =>
                        setModel(e.target.value as 'openai' | 'anthropic')
                    }
                >
                    <option value="openai">ChatGPT (OpenAI)</option>
                    <option value="anthropic">Claude (Anthropic)</option>
                </select>
            </Card>
            <Card className="mb-2 p-4">
                <div className="font-semibold mb-2">API Keys</div>
                <Input
                    placeholder="OpenAI API Key"
                    value={apiKeys.openai}
                    onChange={(e) =>
                        setApiKeys({ ...apiKeys, openai: e.target.value })
                    }
                    className="mb-2"
                />
                <Input
                    placeholder="Anthropic API Key"
                    value={apiKeys.anthropic}
                    onChange={(e) =>
                        setApiKeys({ ...apiKeys, anthropic: e.target.value })
                    }
                />
            </Card>
            <Card className="mb-2 p-4">
                <div className="font-semibold mb-2">System Prompt</div>
                <Textarea
                    placeholder="E.g. 'You are a helpful assistant.' (optional)"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={2}
                />
                <div className="text-xs text-muted-foreground mt-1">
                    Sets assistant behavior for this chat.
                </div>
            </Card>
            <Card className="mb-2 p-4">
                <div className="font-semibold mb-2">Temperature</div>
                <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.1}
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0 = deterministic</span>
                    <span>2 = creative</span>
                </div>
            </Card>
        </aside>
    );
}
