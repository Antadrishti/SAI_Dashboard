'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useState } from 'react'
import { VideoSubmission, apiEndpoints, fetcher, mutateRequest } from '@/lib/api'
import { CheckCircle, XCircle, Clock, Eye, Check, X } from 'lucide-react'
import ReactPlayer from 'react-player'
import useSWR, { useSWRConfig } from 'swr'

export default function VideosPage() {
  const { t } = useLanguage()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedVideo, setSelectedVideo] = useState<VideoSubmission | null>(null)
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { mutate } = useSWRConfig()

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<{ videos: VideoSubmission[]; total: number }>(
    apiEndpoints.videos({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      limit: 50,
    }),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  const videos = data?.videos || []
  const loading = isLoading

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      // Update the video status using mutateRequest
      await mutateRequest<VideoSubmission>(apiEndpoints.updateVideoStatus(id), {
        method: 'PATCH',
        body: { status },
      })

      // Revalidate the videos list
      mutate(apiEndpoints.videos({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        limit: 50,
      }))

      // Update selected video if it's the one being updated
      if (selectedVideo?.id === id) {
        setSelectedVideo({ ...selectedVideo, status })
      }

      // Show success message
      setUpdateMessage({
        type: 'success',
        text: `Video ${status === 'approved' ? 'approved' : 'rejected'} successfully!`,
      })

      // Clear message after 3 seconds
      setTimeout(() => setUpdateMessage(null), 3000)
    } catch (error) {
      console.error('Failed to update video status:', error)
      setUpdateMessage({
        type: 'error',
        text: 'Failed to update video status. Please try again.',
      })
      setTimeout(() => setUpdateMessage(null), 3000)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('videos.title')}</h1>
          <p className="text-gray-600 mt-1">Review and verify athlete video submissions</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex gap-4">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : t(`videos.${status}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Update Message */}
        {updateMessage && (
          <div
            className={`fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg ${
              updateMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {updateMessage.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>{updateMessage.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Videos List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">{t('common.loading')}</div>
            ) : error ? (
              <div className="p-12 text-center text-red-500">Failed to load videos. Please try again.</div>
            ) : videos.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No videos found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedVideo?.id === video.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(video.status)}
                          <h3 className="font-semibold text-gray-900">{video.athleteName}</h3>
                          {getStatusBadge(video.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{t('videos.test')}:</span> {video.testType}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(video.submittedAt).toLocaleString()}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {video.aiVerification.verified ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-xs text-gray-600">
                              AI: {video.aiVerification.verified ? t('videos.verified') : t('videos.notVerified')}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Confidence: {(video.aiVerification.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Review Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {selectedVideo ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('videos.review')}
                  </h2>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
                    {selectedVideo.videoUrl.includes('example.com') ? (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <p className="text-lg mb-2">Video Preview</p>
                          <p className="text-sm text-gray-400">
                            {selectedVideo.testType} - {selectedVideo.athleteName}
                          </p>
                          <p className="text-xs text-gray-500 mt-4">
                            In production, this would display the actual video
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ReactPlayer
                        url={selectedVideo.videoUrl}
                        width="100%"
                        height="100%"
                        controls
                        playing={false}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t('videos.athlete')}
                    </h3>
                    <p className="text-gray-900">{selectedVideo.athleteName}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t('videos.test')}
                    </h3>
                    <p className="text-gray-900">{selectedVideo.testType}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t('videos.verification')}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span
                          className={`text-sm font-medium ${
                            selectedVideo.aiVerification.verified
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {selectedVideo.aiVerification.verified
                            ? t('videos.verified')
                            : t('videos.notVerified')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {(selectedVideo.aiVerification.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      {selectedVideo.aiVerification.anomalies.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-600 mb-1">Anomalies:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {selectedVideo.aiVerification.anomalies.map((anomaly, idx) => (
                              <li key={idx}>{anomaly}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Object.keys(selectedVideo.aiVerification.metrics).length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">Metrics:</p>
                          <div className="space-y-1">
                            {Object.entries(selectedVideo.aiVerification.metrics).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-gray-600 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                  </span>
                                  <span className="font-medium text-gray-900">{value}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedVideo.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={() => handleStatusUpdate(selectedVideo.id, 'approved')}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        {t('videos.approve')}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedVideo.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        {t('videos.reject')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Select a video to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
