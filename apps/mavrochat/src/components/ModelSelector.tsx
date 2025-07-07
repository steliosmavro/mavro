'use client';

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@repo/ui/components';
import { useModel } from '../context/ModelContext';

export function ModelSelector() {
    const { model, setModel } = useModel();

    return (
        <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-32" aria-label="Select AI model">
                <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                {/* Future models can be added here */}
            </SelectContent>
        </Select>
    );
}
