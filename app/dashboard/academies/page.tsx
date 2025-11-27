'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { AcademyStats } from '@/components/academy/AcademyStats'
import { AcademyCard } from '@/components/academy/AcademyCard'
import { mockAcademies } from '@/lib/mockData/academies'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function AcademiesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [stateFilter, setStateFilter] = useState<string>('all')

    // Get unique states for filter
    const uniqueStates = ['all', ...Array.from(new Set(mockAcademies.map((a) => a.state)))]

    // Filter academies
    const filteredAcademies = mockAcademies.filter((academy) => {
        const matchesSearch =
            academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            academy.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            academy.state.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'all' || academy.status === statusFilter
        const matchesState = stateFilter === 'all' || academy.state === stateFilter

        return matchesSearch && matchesStatus && matchesState
    })

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2B2F77] mb-2">Academy Management</h1>
                <p className="text-gray-600">Monitor and manage academy activities</p>
            </div>

            {/* Statistics */}
            <AcademyStats />

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search academies by name or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                        />
                    </div>

                    {/* State/Region Filter */}
                    <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                    >
                        {uniqueStates.map((state) => (
                            <option key={state} value={state}>
                                {state === 'all' ? 'All States' : state}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredAcademies.length} of {mockAcademies.length} academies
                </div>
            </div>

            {/* Academy Grid */}
            {filteredAcademies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAcademies.map((academy) => (
                        <AcademyCard key={academy.id} academy={academy} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <p className="text-gray-500">No academies found matching your criteria</p>
                </div>
            )}
        </DashboardLayout>
    )
}
