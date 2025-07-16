'use client';

import React, { useState, useRef } from 'react';
import { useApiTokenContext } from '../context/ApiTokenContext';
import { useModel } from '../context/ModelContext';
import { Input, Button } from '@repo/ui/components';
import { Key, Check, X, Info } from 'lucide-react';

export function ApiTokenIndicator() {
    const { tokens, setToken, removeToken, getProviderFromModel } =
        useApiTokenContext();
    const { model } = useModel();
    const [isEditing, setIsEditing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentProvider = getProviderFromModel(model);
    const currentToken = currentProvider ? tokens[currentProvider] : '';
    const [inputValue, setInputValue] = useState(currentToken || '');

    React.useEffect(() => {
        setInputValue(currentToken || '');
    }, [currentToken, model]);

    const handleSave = () => {
        if (currentProvider) {
            if (inputValue.trim()) {
                setToken(currentProvider, inputValue.trim());
            } else {
                removeToken(currentProvider);
            }
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setInputValue(currentToken || '');
        setIsEditing(false);
    };

    const getPlaceholder = () => {
        if (!currentProvider) return 'Select a model first';
        return currentProvider === 'openai' ? 'sk-...' : 'sk-ant-...';
    };

    const getProviderName = () => {
        if (!currentProvider) return '';
        return currentProvider === 'openai' ? 'OpenAI' : 'Anthropic';
    };

    const handleMouseEnter = () => {
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
            tooltipTimeoutRef.current = null;
        }
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        tooltipTimeoutRef.current = setTimeout(() => {
            setShowTooltip(false);
        }, 100); // Small delay to allow mouse to move to tooltip
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (tooltipTimeoutRef.current) {
                clearTimeout(tooltipTimeoutRef.current);
            }
        };
    }, []);

    if (!currentProvider) {
        return null;
    }

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        <Key className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <Input
                        type="password"
                        placeholder={getPlaceholder()}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
                            } else if (e.key === 'Escape') {
                                handleCancel();
                            }
                        }}
                        className="w-48 h-8 pl-8 text-xs font-mono"
                        autoFocus
                    />
                </div>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={handleSave}
                    title="Save"
                >
                    <Check className="h-3.5 w-3.5" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={handleCancel}
                    title="Cancel"
                >
                    <X className="h-3.5 w-3.5" />
                </Button>
            </div>
        );
    }

    return (
        <div className="relative flex items-center gap-2">
            {currentToken ? (
                <div className="relative">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setIsEditing(true)}
                        title={`${getProviderName()} API Key Active`}
                    >
                        <Key className="h-3.5 w-3.5" />
                    </Button>
                    <Check className="h-3 w-3 text-green-500 absolute -top-0.5 -right-0.5 bg-background rounded-full" />
                </div>
            ) : (
                <div className="relative">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setIsEditing(true)}
                        title={`Add ${getProviderName()} API Key`}
                    >
                        <Key className="h-3.5 w-3.5" />
                    </Button>
                    <X className="h-3 w-3 text-red-500 absolute -top-0.5 -right-0.5 bg-background rounded-full" />
                </div>
            )}

            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />

                {showTooltip && (
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-4 bg-popover border rounded-lg shadow-lg z-50"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="space-y-3 text-sm">
                            <div className="font-medium flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                {getProviderName()} API Key
                            </div>

                            <div className="space-y-2 text-muted-foreground">
                                <div>
                                    <strong>Rate Limits:</strong>
                                    <ul className="mt-2">
                                        <li>
                                            Without API key: 10 messages/day for
                                            unauthenticated accounts
                                        </li>
                                        <li>
                                            With your API key: Unlimited usage
                                        </li>
                                    </ul>
                                </div>

                                {currentToken && (
                                    <div className="pt-2 border-t">
                                        <div className="text-xs">
                                            Your API key is active and stored
                                            locally in your browser.
                                        </div>
                                    </div>
                                )}

                                {!currentToken && (
                                    <div className="pt-2 border-t">
                                        <a
                                            href={
                                                currentProvider === 'openai'
                                                    ? 'https://platform.openai.com/api-keys'
                                                    : 'https://console.anthropic.com/settings/keys'
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Get your {getProviderName()} API key
                                            →
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
