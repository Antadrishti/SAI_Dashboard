'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { AnalyticsData, apiEndpoints, fetcher } from '@/lib/api'
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
import useSWR from 'swr'

export default function AnalyticsPage() {
  const { t, formatNumber, formatDate, getLocale } = useLanguage()

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<AnalyticsData>(
    apiEndpoints.analytics,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">{t('common.loading')}</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{t('error.loadFailed')}</div>
        </div>
      </DashboardLayout>
    )
  }

  const verificationRate = ((data.verifiedTests / data.totalVideos) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('analytics.title')}</h1>
          <p className="text-gray-600 mt-1">{t('analytics.subtitle')}</p>
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
                tickFormatter={(value) => formatDate(value, { month: 'short', day: 'numeric' })}
              />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip
                labelFormatter={(value) => formatDate(value, { year: 'numeric', month: 'long', day: 'numeric' })}
                formatter={(value: number) => [formatNumber(value), '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="tests"
                stroke="#0ea5e9"
                strokeWidth={2}
                name={t('analytics.totalTests')}
              />
              <Line
                type="monotone"
                dataKey="verified"
                stroke="#10b981"
                strokeWidth={2}
                name={t('analytics.verified')}
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
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <Tooltip formatter={(value: number) => [formatNumber(value), '']} />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" name={t('analytics.numberOfTests')} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {t('analytics.totalAthletes')}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(data.totalAthletes)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {t('analytics.totalVideos')}
            </h3>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(data.totalVideos)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {t('analytics.verificationRate')}
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatNumber(parseFloat(verificationRate))}%
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
