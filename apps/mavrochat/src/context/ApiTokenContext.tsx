'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useApiTokens, ApiTokens, ModelProvider } from '../hooks/useApiTokens';

interface ApiTokenContextValue {
    tokens: ApiTokens;
    isLoading: boolean;
    setToken: (provider: ModelProvider, token: string) => void;
    removeToken: (provider: ModelProvider) => void;
    clearAllTokens: () => void;
    getTokenForModel: (model: string) => string | undefined;
    getProviderFromModel: (model: string) => ModelProvider | null;
}

const ApiTokenContext = createContext<ApiTokenContextValue | undefined>(
    undefined,
);

export function ApiTokenProvider({ children }: { children: ReactNode }) {
    const apiTokens = useApiTokens();

    return (
        <ApiTokenContext.Provider value={apiTokens}>
            {children}
        </ApiTokenContext.Provider>
    );
}

export function useApiTokenContext() {
    const context = useContext(ApiTokenContext);
    if (!context) {
        throw new Error(
            'useApiTokenContext must be used within ApiTokenProvider',
        );
    }
    return context;
}
