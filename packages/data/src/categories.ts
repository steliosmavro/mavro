import type { ProjectCategory, CategoryConfig } from './types';

/**
 * Category configuration with Tailwind gradient classes
 * @safelist from-purple-500 to-pink-500 from-orange-500 to-amber-500 from-yellow-500 to-orange-500
 * @safelist from-cyan-500 to-blue-500 from-red-500 to-rose-500 from-violet-400 to-purple-400
 * @safelist from-green-500 to-emerald-500
 */
export const categoryConfig: Record<ProjectCategory, CategoryConfig> = {
    'ai-ml': {
        label: 'AI & Machine Learning',
        color: 'from-purple-500 to-pink-500',
    },
    web3: {
        label: 'Web3 & Blockchain',
        color: 'from-orange-500 to-amber-500', // Changed from emerald/teal to orange/amber
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
        color: 'from-red-500 to-rose-500', // Changed from red/orange to red/rose
    },
    website: {
        label: 'Website',
        color: 'from-violet-400 to-purple-400', // Lighter purple for better visibility
    },
    contributions: {
        label: 'Contributions',
        color: 'from-green-500 to-emerald-500', // Changed from green/teal to green/emerald
    },
};

export function getCategoryLabel(category: ProjectCategory): string {
    return categoryConfig[category].label;
}

export function getCategoryColor(category: ProjectCategory): string {
    return categoryConfig[category].color;
}

export function getPrimaryCategory(
    categories: ProjectCategory[],
): ProjectCategory | null {
    return categories[0] || null;
}

export function validateCategory(
    category: string,
): category is ProjectCategory {
    return category in categoryConfig;
}

export function getCategories(): ProjectCategory[] {
    return Object.keys(categoryConfig) as ProjectCategory[];
}
