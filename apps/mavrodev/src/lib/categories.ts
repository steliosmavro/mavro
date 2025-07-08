import type { ProjectCategory } from '@/types/resume';

export interface CategoryConfig {
    label: string;
    color: string; // Tailwind gradient classes
}

export const categoryConfig: Record<ProjectCategory, CategoryConfig> = {
    'ai-ml': {
        label: 'AI & Machine Learning',
        color: 'from-purple-500 to-pink-500',
    },
    web3: {
        label: 'Web3 & Blockchain',
        color: 'from-emerald-500 to-teal-500',
    },
    'developer-tools': {
        label: 'Developer Tools',
        color: 'from-yellow-500 to-orange-500',
    },
    'open-source': {
        label: 'Open Source',
        color: 'from-cyan-500 to-blue-500',
    },
    automation: {
        label: 'Automation',
        color: 'from-red-500 to-orange-500',
    },
    website: {
        label: 'Website',
        color: 'from-blue-500 to-indigo-500',
    },
    contributions: {
        label: 'Contributions',
        color: 'from-green-500 to-teal-500',
    },
};

export function getCategoryLabel(category: ProjectCategory): string {
    return categoryConfig[category].label;
}

export function getCategoryColor(category: ProjectCategory): string {
    return categoryConfig[category].color;
}

// Get the primary category for color theming (first category in array)
export function getPrimaryCategory(
    categories: ProjectCategory[],
): ProjectCategory | null {
    return categories[0] || null;
}
