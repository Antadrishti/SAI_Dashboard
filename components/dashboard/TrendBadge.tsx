'use client'

import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface TrendBadgeProps {
    value: string
    positive?: boolean
}

export function TrendBadge({ value, positive = true }: TrendBadgeProps) {
    const { formatNumber } = useLanguage()
    
    // Format the trend value (handles "+12%", "+2", etc.)
    const formatTrend = (val: string): string => {
        // Extract sign, number, and suffix
        const match = val.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/)
        if (match) {
            const [, sign, num, suffix] = match
            return `${sign}${formatNumber(parseFloat(num))}${suffix}`
        }
        return val
    }

    return (
        <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold ${positive
                    ? 'bg-success bg-opacity-10 text-success'
                    : 'bg-error bg-opacity-10 text-error'
                }`}
        >
            {positive ? (
                <ArrowUp className="w-3.5 h-3.5" />
            ) : (
                <ArrowDown className="w-3.5 h-3.5" />
            )}
            <span>{formatTrend(value)}</span>
        </div>
    )
}
