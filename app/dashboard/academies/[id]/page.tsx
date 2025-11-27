'use client'

import { DashboardLayout } from '@/components/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { mockAcademies, mockAcademyActivities } from '@/lib/mockData/academies'
import { MapPin, Phone, Mail, User, ArrowLeft, Calendar, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function AcademyDetailPage() {
    const params = useParams()
    const academyId = params.id as string

    // Find academy from mock data
    const academy = mockAcademies.find((a) => a.id === academyId)
    const activities = mockAcademyActivities.filter((a) => a.academyId === academyId)

    if (!academy) {
        return (
            <DashboardLayout>
                <div className="text-center py-12">
                    <p className="text-gray-500">Academy not found</p>
                </div>
            </DashboardLayout>
        )
    }

    const approvalRate = academy.athletesReviewed > 0
        ? Math.round((academy.athletesApproved / academy.athletesReviewed) * 100)
        : 0

    return (
        <DashboardLayout>
            {/* Back Button */}
            <Link
                href="/dashboard/academies"
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF8C42] mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Academies
            </Link>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#2B2F77] mb-2">{academy.name}</h1>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {academy.location}, {academy.state}
                        </div>
                    </div>
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${academy.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {academy.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Contact Info */}
                    <Card>
                        <h3 className="text-lg font-bold text-[#2B2F77] mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Contact Person</p>
                                    <p className="font-medium text-gray-900">{academy.contactPerson}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-900">{academy.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{academy.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Joined</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(academy.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Statistics */}
                    <Card>
                        <h3 className="text-lg font-bold text-[#2B2F77] mb-4">Statistics</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Athletes Reviewed</span>
                                    <span className="text-lg font-bold text-[#2B2F77]">{academy.athletesReviewed}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-green-600">Approved</span>
                                    <span className="text-lg font-bold text-green-600">{academy.athletesApproved}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-red-600">Rejected</span>
                                    <span className="text-lg font-bold text-red-600">{academy.athletesRejected}</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Approval Rate</span>
                                    <span className="text-lg font-bold text-[#FF8C42]">{approvalRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-[#FF8C42] h-2 rounded-full"
                                        style={{ width: `${approvalRate}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Activity */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-lg font-bold text-[#2B2F77] mb-6">Recent Activity</h3>
                        {activities.length > 0 ? (
                            <div className="space-y-4">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.activityType === 'review_approved'
                                                    ? 'bg-green-100'
                                                    : 'bg-red-100'
                                                }`}
                                        >
                                            {activity.activityType === 'review_approved' ? (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900 font-medium">{activity.description}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No recent activities</p>
                        )}
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
