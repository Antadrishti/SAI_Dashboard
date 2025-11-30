'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useState } from 'react'
import { Athlete, apiEndpoints, fetcher } from '@/lib/api'
import { Search, Filter, Eye, User, X } from 'lucide-react'
import useSWR from 'swr'

export default function AthletesPage() {
  const { t, formatNumber } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<{ athletes: Athlete[]; total: number }>(
    apiEndpoints.athletes({
      search: searchQuery || undefined,
      filter: filter !== 'all' ? filter : undefined,
      limit: 50,
    }),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  const athletes = data?.athletes || []
  const loading = isLoading

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800',
    }
    const statusTranslations: Record<string, string> = {
      active: t('status.active'),
      pending: t('status.pending'),
      verified: t('status.verified'),
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
          }`}
      >
        {statusTranslations[status] || status}
      </span>
    )
  }

  const translateGender = (gender: string): string => {
    const genders: Record<string, string> = {
      male: t('gender.male'),
      female: t('gender.female'),
      other: t('gender.other'),
    }
    return genders[gender.toLowerCase()] || gender
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('athletes.title')}</h1>
          <p className="text-gray-600 mt-1">{t('athletes.subtitle')}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('athletes.search')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Athletes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">{t('common.loading')}</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">{t('error.loadFailed')}</div>
          ) : athletes.length === 0 ? (
            <div className="p-12 text-center text-gray-500">{t('athletes.noResults')}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('athletes.name')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('athletes.age')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('athletes.gender')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('athletes.location')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('athletes.tests')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('videos.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {athletes.map((athlete) => (
                    <tr key={athlete.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                            <div className="text-sm text-gray-500">{athlete.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(athlete.age)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {translateGender(athlete.gender)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{athlete.location}</div>
                        <div className="text-sm text-gray-500">{athlete.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(athlete.testsCompleted)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedAthlete(athlete)}
                          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{t('athletes.view')}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Athlete Detail Modal */}
        {selectedAthlete && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setSelectedAthlete(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{t('athletes.details')}</h2>
                  <button
                    onClick={() => setSelectedAthlete(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedAthlete.name}</h3>
                      <p className="text-gray-500">{selectedAthlete.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500">{t('athletes.age')}</label>
                      <p className="text-lg text-gray-900">{formatNumber(selectedAthlete.age)} {t('common.years')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">{t('athletes.gender')}</label>
                      <p className="text-lg text-gray-900 capitalize">{translateGender(selectedAthlete.gender)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">{t('athletes.location')}</label>
                      <p className="text-lg text-gray-900">{selectedAthlete.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">{t('athletes.state')}</label>
                      <p className="text-lg text-gray-900">{selectedAthlete.state}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">{t('athletes.testsCompleted')}</label>
                      <p className="text-lg text-gray-900">{formatNumber(selectedAthlete.testsCompleted)}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedAthlete(null)}
                      className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {t('common.close')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
