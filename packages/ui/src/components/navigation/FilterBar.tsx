'use client';

import React from 'react';
import { Button } from '../form/Button';
import { Badge } from '../display/Badge';
import { Filter } from 'lucide-react';

export interface FilterOption {
    value: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
}

interface FilterBarProps {
    options: FilterOption[];
    selectedValue: string | null;
    onValueChange: (value: string | null) => void;
    allLabel?: string;
    allIcon?: React.ReactNode;
    allCount?: number;
    showCounts?: boolean;
    size?: 'sm' | 'default';
    className?: string;
}

export function FilterBar({
    options,
    selectedValue,
    onValueChange,
    allLabel = 'All',
    allIcon = <Filter className="h-4 w-4" />,
    allCount,
    showCounts = true,
    size = 'default',
    className = '',
}: FilterBarProps) {
    const displayAllCount =
        allCount !== undefined
            ? allCount
            : options.reduce((sum, opt) => sum + (opt.count || 0), 0);

    return (
        <div className={`flex gap-2 flex-wrap justify-center ${className}`}>
            <Button
                variant={selectedValue === null ? 'default' : 'outline'}
                size={size}
                onClick={() => onValueChange(null)}
                className="flex items-center gap-2"
            >
                {allIcon}
                {allLabel}
                {showCounts && displayAllCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                        {displayAllCount}
                    </Badge>
                )}
            </Button>
            {options.map((option) => {
                const hasCount = showCounts && option.count !== undefined;
                if (hasCount && option.count === 0) return null;

                return (
                    <Button
                        key={option.value}
                        variant={
                            selectedValue === option.value
                                ? 'default'
                                : 'outline'
                        }
                        size={size}
                        onClick={() => onValueChange(option.value)}
                        className="group"
                    >
                        {option.icon}
                        {option.label}
                        {hasCount && (
                            <Badge variant="secondary" className="ml-1">
                                {option.count}
                            </Badge>
                        )}
                    </Button>
                );
            })}
        </div>
    );
}
