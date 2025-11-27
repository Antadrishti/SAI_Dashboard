'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Users, CheckCircle, Building2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiClient, AnalyticsData } from '@/lib/api'
import { StatCard } from '@/components/dashboard/StatCard'

export default function DashboardPage() {
  const { t } = useLanguage()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const analytics = await apiClient.getAnalytics()
      setData(analytics)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">{t('common.loading')}</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2B2F77]">{t('nav.dashboard')}</h1>
          <p className="text-[#6B7280] mt-1">Welcome to Sports Aadhaar</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title={t('analytics.totalAthletes')}
            value={data.totalAthletes}
            trend="+12%"
            trendPositive={true}
            icon={Users}
            iconColor="orange"
          />
          <StatCard
            title="Total Academies"
            value={8}
            trend="+2"
            trendPositive={true}
            icon={Building2}
            iconColor="purple"
          />
          <StatCard
            title="Total Test Submissions"
            value={data.totalVideos}
            trend="+15%"
            trendPositive={true}
            icon={CheckCircle}
            iconColor="green"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[20px] shadow-card p-6">
          <h2 className="text-xl font-semibold text-[#2B2F77] mb-6">
            {t('analytics.recentActivity')}
          </h2>
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-sm font-semibold text-[#FF8C42]">
                  {activity.description.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-[#2B2F77] font-medium">{activity.description}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
