import { useState, useEffect, useCallback } from 'react';

export type ModelProvider = 'openai' | 'anthropic';

export interface ApiTokens {
    openai?: string;
    anthropic?: string;
}

const STORAGE_KEY = 'mavrochat-api-tokens';

export function useApiTokens() {
    const [tokens, setTokens] = useState<ApiTokens>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTokens = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored) as ApiTokens;
                    setTokens(parsed);
                }
            } catch (error) {
                console.error('Failed to load API tokens:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTokens();
    }, []);

    const saveTokens = useCallback((newTokens: ApiTokens) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTokens));
            setTokens(newTokens);
        } catch (error) {
            console.error('Failed to save API tokens:', error);
        }
    }, []);

    const setToken = useCallback(
        (provider: ModelProvider, token: string) => {
            const newTokens = { ...tokens, [provider]: token };
            saveTokens(newTokens);
        },
        [tokens, saveTokens],
    );

    const removeToken = useCallback(
        (provider: ModelProvider) => {
            const newTokens = { ...tokens };
            delete newTokens[provider];
            saveTokens(newTokens);
        },
        [tokens, saveTokens],
    );

    const clearAllTokens = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setTokens({});
    }, []);

    const getProviderFromModel = (model: string): ModelProvider | null => {
        if (model.includes('gpt') || model.includes('o1')) {
            return 'openai';
        } else if (model.includes('claude')) {
            return 'anthropic';
        }
        return null;
    };

    const getTokenForModel = useCallback(
        (model: string): string | undefined => {
            const provider = getProviderFromModel(model);
            return provider ? tokens[provider] : undefined;
        },
        [tokens],
    );

    return {
        tokens,
        isLoading,
        setToken,
        removeToken,
        clearAllTokens,
        getTokenForModel,
        getProviderFromModel,
    };
}
