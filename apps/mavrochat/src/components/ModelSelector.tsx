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
            <SelectTrigger className="w-[10.5rem]" aria-label="Select AI model">
                <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3-5-sonnet-latest">
                    Claude 3.5 Sonnet
                </SelectItem>
                <SelectItem value="claude-3-5-haiku-latest">
                    Claude 3.5 Haiku
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
