import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      config.headers.Authorization = `Bearer ${userData.token || ''}`
    }
  }
  return config
})

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

export const apiClient = {
  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get('/analytics')
    return response.data
  },

  // Athletes
  getAthletes: async (params?: {
    search?: string
    filter?: string
    page?: number
    limit?: number
  }): Promise<{ athletes: Athlete[]; total: number }> => {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.append('search', params.search)
    if (params?.filter) queryParams.append('filter', params.filter)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const response = await api.get(`/athletes?${queryParams.toString()}`)
    return response.data
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
    // Mock data
    const mockVideos: VideoSubmission[] = Array.from({ length: 100 }, (_, i) => ({
      id: `video-${i + 1}`,
      athleteId: `athlete-${Math.floor(i / 5) + 1}`,
      athleteName: `Athlete ${Math.floor(i / 5) + 1}`,
      testType: ['Vertical Jump', 'Sit-ups', 'Push-ups', '100m Run', 'Flexibility'][i % 5],
      videoUrl: `https://example.com/video-${i + 1}.mp4`,
      submittedAt: new Date(Date.now() - i * 3600000).toISOString(),
      status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as any,
      aiVerification: {
        verified: Math.random() > 0.3,
        confidence: Math.random() * 0.3 + 0.7,
        anomalies: Math.random() > 0.8 ? ['Possible movement anomaly detected'] : [],
        metrics: {
          jumpHeight: Math.random() * 50 + 30,
          reps: Math.floor(Math.random() * 30) + 10,
          time: Math.random() * 20 + 10,
        },
      },
    }))

    let filtered = mockVideos
    if (params?.status) {
      filtered = filtered.filter((v) => v.status === params.status)
    }
    if (params?.athleteId) {
      filtered = filtered.filter((v) => v.athleteId === params.athleteId)
    }

    return {
      videos: filtered.slice(
        ((params?.page || 1) - 1) * (params?.limit || 20),
        (params?.page || 1) * (params?.limit || 20)
      ),
      total: filtered.length,
    }
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
    // In production, this would make an API call
    // For demo, return updated video object
    const updatedVideo: VideoSubmission = {
      id,
      athleteId: 'athlete-1',
      athleteName: 'Sample Athlete',
      testType: 'Vertical Jump',
      videoUrl: 'https://example.com/video.mp4',
      submittedAt: new Date().toISOString(),
      status,
      aiVerification: {
        verified: true,
        confidence: 0.95,
        anomalies: [],
        metrics: {
          jumpHeight: 45.2,
        },
      },
      reviewerNotes: notes,
    }
    return updatedVideo
  },
}

