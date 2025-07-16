'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface ModelContextType {
    model: string;
    setModel: (model: string) => void;
}

const DEFAULT_MODEL = 'gpt-4o';
const MODEL_STORAGE_KEY = 'mavrochat-selected-model';

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: React.ReactNode }) {
    const [model, setModel] = useState<string>(DEFAULT_MODEL);
    const [mounted, setMounted] = useState(false);

    // Load saved model preference on mount
    useEffect(() => {
        setMounted(true);
        try {
            const savedModel = localStorage.getItem(MODEL_STORAGE_KEY);
            if (savedModel) {
                setModel(savedModel);
            }
        } catch (error) {
            console.error('Failed to load saved model:', error);
        }
    }, []);

    // Save model preference when it changes (only after mounted)
    useEffect(() => {
        if (mounted) {
            try {
                localStorage.setItem(MODEL_STORAGE_KEY, model);
            } catch (error) {
                console.error('Failed to save model preference:', error);
            }
        }
    }, [model, mounted]);

    return (
        <ModelContext.Provider value={{ model, setModel }}>
            {children}
        </ModelContext.Provider>
    );
}

export function useModel() {
    const context = useContext(ModelContext);
    if (!context) {
        throw new Error('useModel must be used within a ModelProvider');
    }
    return context;
}
