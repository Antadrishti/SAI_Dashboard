import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card } from '../ui/Card'
import { TrendBadge } from './TrendBadge'
import { AnimatedNumber } from './AnimatedNumber'

interface StatCardProps {
    title: string
    value: number
    trend: string
    trendPositive?: boolean
    icon: LucideIcon
    iconColor: 'orange' | 'purple' | 'green' | 'amber'
}

const iconBackgroundColors = {
    orange: 'bg-[#FF8C42] bg-opacity-10',
    purple: 'bg-purple-500 bg-opacity-10',
    green: 'bg-[#00D09C] bg-opacity-10',
    amber: 'bg-[#FFB020] bg-opacity-10',
}

const iconColors = {
    orange: 'text-[#FF8C42]',
    purple: 'text-purple-500',
    green: 'text-[#00D09C]',
    amber: 'text-[#FFB020]',
}

export function StatCard({
    title,
    value,
    trend,
    trendPositive = true,
    icon: Icon,
    iconColor,
}: StatCardProps) {
    return (
        <Card hover className="relative">
            <div className="flex flex-col">
                {/* Icon */}
                <div className="absolute top-6 right-6">
                    <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBackgroundColors[iconColor]}`}
                    >
                        <Icon className={`w-7 h-7 ${iconColors[iconColor]}`} />
                    </div>
                </div>

                {/* Trend Badge */}
                <div className="mb-3">
                    <TrendBadge value={trend} positive={trendPositive} />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-[#2B2F77] mb-2">
                    <AnimatedNumber value={value} />
                </div>

                {/* Title */}
                <div className="text-sm text-[#6B7280] font-medium">{title}</div>
            </div>
        </Card>
    )
}
