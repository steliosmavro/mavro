'use client';

import { createContext, useContext, useState } from 'react';

interface ModelContextType {
    model: string;
    setModel: (model: string) => void;
}

const DEFAULT_MODEL = 'gpt-4o';

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: React.ReactNode }) {
    const [model, setModel] = useState<string>(DEFAULT_MODEL);

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
