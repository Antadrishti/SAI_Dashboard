'use client'

import React, { useEffect, useState } from 'react'

interface AnimatedNumberProps {
    value: number
    duration?: number
}

export function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        let startTime: number | null = null
        const startValue = 0

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            const currentValue = Math.floor(progress * (value - startValue) + startValue)
            setDisplayValue(currentValue)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [value, duration])

    return <span>{displayValue.toLocaleString()}</span>
}
