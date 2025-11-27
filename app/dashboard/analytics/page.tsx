'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useEffect, useState } from 'react'
import { apiClient, AnalyticsData } from '@/lib/api'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function AnalyticsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">{t('analytics.title')}</h1>
          <p className="text-gray-600 mt-1">Comprehensive performance analytics</p>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t('analytics.performance')}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="tests"
                stroke="#0ea5e9"
                strokeWidth={2}
                name="Total Tests"
              />
              <Line
                type="monotone"
                dataKey="verified"
                stroke="#10b981"
                strokeWidth={2}
                name="Verified"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Test Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t('analytics.testDistribution')}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.testDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="testType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" name="Number of Tests" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {t('analytics.totalAthletes')}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{data.totalAthletes.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {t('analytics.totalVideos')}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{data.totalVideos.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Verification Rate
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {((data.verifiedTests / data.totalVideos) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}




