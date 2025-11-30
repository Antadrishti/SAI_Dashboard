'use client'

import Lottie from 'lottie-react'
import useSWR from 'swr'

interface LottieAnimationProps {
  animationData?: object
  path?: string
  width?: number
  height?: number
  loop?: boolean
  autoplay?: boolean
  className?: string
}

// Fetcher for Lottie JSON files
const lottieFetcher = async (url: string): Promise<object> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to load Lottie animation')
  }
  return response.json()
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
  // Use SWR to fetch animation data if path is provided
  const { data, error } = useSWR<object>(
    path && !animationData ? path : null,
    lottieFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // Use provided animationData or fetched data
  const animation = animationData || data

  if (error) {
    console.error('Failed to load Lottie animation:', error)
    return null
  }

  if (!animation) {
    return null
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={animation}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
