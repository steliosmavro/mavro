import { format, parseISO, isValid } from 'date-fns';

/**
 * Format a date string or Date object to a human-readable format
 * @param date - The date to format (string or Date object)
 * @param formatString - The format string (default: 'MMM yyyy')
 * @returns Formatted date string
 */
export function formatDate(
    date: string | Date,
    formatString: string = 'MMM yyyy',
): string {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        if (!isValid(dateObj)) {
            return typeof date === 'string' ? date : 'Invalid date';
        }

        return format(dateObj, formatString);
    } catch (error) {
        console.error('Error formatting date:', error);
        return typeof date === 'string' ? date : 'Invalid date';
    }
}

/**
 * Format a date range (e.g., "Jan 2023 - Present" or "Jan 2023 - Dec 2023")
 * @param startDate - The start date
 * @param endDate - The end date (null for ongoing)
 * @param formatString - The format string (default: 'MMM yyyy')
 * @returns Formatted date range string
 */
export function formatDateRange(
    startDate: string | Date,
    endDate: string | Date | null,
    formatString: string = 'MMM yyyy',
): string {
    const formattedStart = formatDate(startDate, formatString);

    if (!endDate) {
        return `${formattedStart} - Present`;
    }

    const formattedEnd = formatDate(endDate, formatString);
    return `${formattedStart} - ${formattedEnd}`;
}

/**
 * Format experience period (handles both strings and date objects)
 * @param period - The period string or object with start/end dates
 * @returns Formatted period string showing only years
 */
export function formatPeriod(
    period: string | { start: Date; end?: Date },
): string {
    // Handle date object format
    if (typeof period === 'object' && period.start) {
        const startYear = period.start.getFullYear();

        if (!period.end) {
            return `${startYear} - Present`;
        }

        const endYear = period.end.getFullYear();

        if (startYear === endYear) {
            return `${startYear}`;
        }

        return `${startYear} - ${endYear}`;
    }

    // Handle string format (legacy support)
    if (typeof period === 'string') {
        // If it already contains month names, return as is
        if (/[A-Za-z]/.test(period)) {
            return period;
        }

        // Try to parse year-only format (e.g., "2023 - 2024")
        const yearMatch = period.match(/(\d{4})\s*-\s*(\d{4}|Present)/i);
        if (yearMatch) {
            const startYear = yearMatch[1];
            const endYear = yearMatch[2];

            if (!endYear) {
                return period;
            }

            if (endYear.toLowerCase() === 'present') {
                return `${startYear} - Present`;
            }

            return `${startYear} - ${endYear}`;
        }

        return period;
    }

    return 'Invalid period';
}
