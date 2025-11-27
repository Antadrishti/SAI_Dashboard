import React from 'react'
import { Building2, Users, CheckCircle, Activity } from 'lucide-react'
import { StatCard } from '../dashboard/StatCard'
import { mockAcademies } from '@/lib/mockData/academies'

export function AcademyStats() {
    // Calculate stats from mock data
    const totalAcademies = mockAcademies.length
    const activeAcademies = mockAcademies.filter((a) => a.status === 'active').length
    const totalReviews = mockAcademies.reduce((sum, a) => sum + a.athletesReviewed, 0)
    const totalApproved = mockAcademies.reduce((sum, a) => sum + a.athletesApproved, 0)
    const approvalRate = totalReviews > 0 ? Math.round((totalApproved / totalReviews) * 100) : 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Academies"
                value={totalAcademies}
                trend="+2"
                trendPositive={true}
                icon={Building2}
                iconColor="orange"
            />
            <StatCard
                title="Active Academies"
                value={activeAcademies}
                trend="+1"
                trendPositive={true}
                icon={Activity}
                iconColor="green"
            />
            <StatCard
                title="Total Reviews"
                value={totalReviews}
                trend="+12%"
                trendPositive={true}
                icon={Users}
                iconColor="purple"
            />
            <StatCard
                title="Approval Rate"
                value={approvalRate}
                trend="+5%"
                trendPositive={true}
                icon={CheckCircle}
                iconColor="green"
            />
        </div>
    )
}
