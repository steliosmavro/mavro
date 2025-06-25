'use client';
import { Button } from '@repo/ui/components/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../providers';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="fixed top-4 right-4 z-50">
            <Button
                variant="secondary"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
        </div>
    );
}
