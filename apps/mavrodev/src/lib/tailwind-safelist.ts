/**
 * This file ensures Tailwind CSS includes all dynamic gradient classes used in categories
 * Tailwind needs to see these classes in the source code to include them in the build
 */

export const gradientSafelist = [
    'from-purple-500 to-pink-500',
    'from-orange-500 to-amber-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500',
    'from-red-500 to-rose-500',
    'from-violet-400 to-purple-400',
    'from-green-500 to-emerald-500',
    'from-gray-500 to-gray-600',
];

// Tailwind classes that need to be included in the build
// These are used dynamically in category gradients
export const tailwindClasses = `
    from-purple-500 to-pink-500
    from-orange-500 to-amber-500
    from-yellow-500 to-orange-500
    from-cyan-500 to-blue-500
    from-red-500 to-rose-500
    from-violet-400 to-purple-400
    from-green-500 to-emerald-500
    from-gray-500 to-gray-600
    bg-gradient-to-br from-purple-500 to-pink-500
    bg-gradient-to-br from-orange-500 to-amber-500
    bg-gradient-to-br from-yellow-500 to-orange-500
    bg-gradient-to-br from-cyan-500 to-blue-500
    bg-gradient-to-br from-red-500 to-rose-500
    bg-gradient-to-br from-violet-400 to-purple-400
    bg-gradient-to-br from-green-500 to-emerald-500
    bg-gradient-to-br from-gray-500 to-gray-600
`;
