import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-[20px] shadow-card p-6',
                hover && 'hover:shadow-card-hover transition-shadow duration-300',
                className
            )}
        >
            {children}
        </div>
    )
}
