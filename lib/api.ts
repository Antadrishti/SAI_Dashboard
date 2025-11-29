const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// SWR Fetcher function
export async function fetcher<T>(url: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token) {
          headers.Authorization = `Bearer ${userData.token}`
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers,
  })

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // @ts-ignore
    error.info = await response.json().catch(() => ({}))
    // @ts-ignore
    error.status = response.status
    throw error
  }

  return response.json()
}

// Mutate function for POST/PUT/DELETE requests
export async function mutateRequest<T>(
  url: string,
  options: {
    method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
  } = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token) {
          headers.Authorization = `Bearer ${userData.token}`
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: options.method || 'POST',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const error = new Error('An error occurred while making the request.')
    // @ts-ignore
    error.info = await response.json().catch(() => ({}))
    // @ts-ignore
    error.status = response.status
    throw error
  }

  return response.json()
}

export interface Athlete {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  location: string
  state: string
  testsCompleted: number
  status: 'active' | 'pending' | 'verified'
  profileImage?: string
}

export interface VideoSubmission {
  id: string
  athleteId: string
  athleteName: string
  testType: string
  videoUrl: string
  thumbnailUrl?: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  aiVerification: {
    verified: boolean
    confidence: number
    anomalies: string[]
    metrics: Record<string, number>
  }
  reviewerNotes?: string
}

export interface AnalyticsData {
  totalAthletes: number
  totalVideos: number
  verifiedTests: number
  pendingReview: number
  performanceData: {
    date: string
    tests: number
    verified: number
  }[]
  testDistribution: {
    testType: string
    count: number
  }[]
  recentActivity: {
    id: string
    type: string
    description: string
    timestamp: string
  }[]
}

// API endpoint helpers
export const apiEndpoints = {
  analytics: '/analytics',
  athletes: (params?: { search?: string; filter?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.append('search', params.search)
    if (params?.filter) queryParams.append('filter', params.filter)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    return `/athletes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
  },
  athlete: (id: string) => `/athletes/${id}`,
  videos: (params?: { status?: string; athleteId?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.athleteId) queryParams.append('athleteId', params.athleteId)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    return `/videos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
  },
  video: (id: string) => `/videos/${id}`,
  updateVideoStatus: (id: string) => `/videos/${id}/status`,
}

// Legacy apiClient for backward compatibility (now uses SWR internally)
// This is kept for any code that might still use it, but components should use SWR hooks directly
export const apiClient = {
  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    return fetcher<AnalyticsData>(apiEndpoints.analytics)
  },

  // Athletes
  getAthletes: async (params?: {
    search?: string
    filter?: string
    page?: number
    limit?: number
  }): Promise<{ athletes: Athlete[]; total: number }> => {
    return fetcher<{ athletes: Athlete[]; total: number }>(apiEndpoints.athletes(params))
  },

  getAthlete: async (id: string): Promise<Athlete> => {
    // Mock data
    return {
      id,
      name: 'Sample Athlete',
      age: 20,
      gender: 'male',
      location: 'Mumbai',
      state: 'Maharashtra',
      testsCompleted: 5,
      status: 'active',
    }
  },

  // Videos
  getVideos: async (params?: {
    status?: string
    athleteId?: string
    page?: number
    limit?: number
  }): Promise<{ videos: VideoSubmission[]; total: number }> => {
    return fetcher<{ videos: VideoSubmission[]; total: number }>(apiEndpoints.videos(params))
  },

  getVideo: async (id: string): Promise<VideoSubmission> => {
    // Mock data
    return {
      id,
      athleteId: 'athlete-1',
      athleteName: 'Sample Athlete',
      testType: 'Vertical Jump',
      videoUrl: 'https://example.com/video.mp4',
      submittedAt: new Date().toISOString(),
      status: 'pending',
      aiVerification: {
        verified: true,
        confidence: 0.95,
        anomalies: [],
        metrics: {
          jumpHeight: 45.2,
        },
      },
    }
  },

  updateVideoStatus: async (
    id: string,
    status: 'approved' | 'rejected',
    notes?: string
  ): Promise<VideoSubmission> => {
    return mutateRequest<VideoSubmission>(apiEndpoints.updateVideoStatus(id), {
      method: 'PATCH',
      body: { status, notes },
    })
  },
}
