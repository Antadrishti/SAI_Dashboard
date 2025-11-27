import React from 'react'
import { Card } from '../ui/Card'
import { MapPin, Users, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import type { Academy } from '@/lib/mockData/academies'

interface AcademyCardProps {
    academy: Academy
}

export function AcademyCard({ academy }: AcademyCardProps) {
    const approvalRate = academy.athletesReviewed > 0
        ? Math.round((academy.athletesApproved / academy.athletesReviewed) * 100)
        : 0

    return (
        <Link href={`/dashboard/academies/${academy.id}`}>
            <Card hover className="h-full">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-[#2B2F77]">{academy.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {academy.location}, {academy.state}
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${academy.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {academy.status}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="flex items-center text-gray-500 text-xs mb-1">
                                <Users className="w-3 h-3 mr-1" />
                                Reviewed
                            </div>
                            <div className="text-2xl font-bold text-[#2B2F77]">{academy.athletesReviewed}</div>
                        </div>
                        <div>
                            <div className="flex items-center text-green-600 text-xs mb-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approved
                            </div>
                            <div className="text-2xl font-bold text-green-600">{academy.athletesApproved}</div>
                        </div>
                        <div>
                            <div className="flex items-center text-red-600 text-xs mb-1">
                                <XCircle className="w-3 h-3 mr-1" />
                                Rejected
                            </div>
                            <div className="text-2xl font-bold text-red-600">{academy.athletesRejected}</div>
                        </div>
                    </div>

                    {/* Approval Rate */}
                    <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Approval Rate</span>
                            <span className="font-semibold text-[#2B2F77]">{approvalRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-[#FF8C42] h-2 rounded-full transition-all"
                                style={{ width: `${approvalRate}%` }}
                            />
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Contact Person</p>
                        <p className="text-sm font-medium text-gray-900">{academy.contactPerson}</p>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
