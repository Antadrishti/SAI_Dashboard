'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface LottieAnimationProps {
  animationData?: object
  path?: string
  width?: number
  height?: number
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieAnimation({
  animationData,
  path,
  width = 48,
  height = 48,
  loop = true,
  autoplay = true,
  className = '',
}: LottieAnimationProps) {
  const [data, setData] = useState<object | null>(animationData || null)

  useEffect(() => {
    if (path && !animationData) {
      fetch(path)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error('Failed to load Lottie animation:', err))
    }
  }, [path, animationData])

  if (!data) {
    return null
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={data}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}



