import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface TrendBadgeProps {
    value: string
    positive?: boolean
}

export function TrendBadge({ value, positive = true }: TrendBadgeProps) {
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
            <span>{value}</span>
        </div>
    )
}
