import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Athlete from '@/lib/models/Athlete'
import Video from '@/lib/models/Video'
import Activity from '@/lib/models/Activity'

export async function GET() {
    try {
        await connectDB()

        // Get counts
        const [totalAthletes, totalVideos, verifiedTests, pendingReview, recentActivity] = await Promise.all([
            Athlete.countDocuments(),
            Video.countDocuments(),
            Video.countDocuments({ status: 'approved' }),
            Video.countDocuments({ status: 'pending' }),
            Activity.find().sort({ timestamp: -1 }).limit(10).lean(),
        ])

        // Get performance data (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const videosByDay = await Video.aggregate([
            {
                $match: {
                    submittedAt: { $gte: thirtyDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' },
                    },
                    tests: { $sum: 1 },
                    verified: {
                        $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] },
                    },
                },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    tests: 1,
                    verified: 1,
                },
            },
        ])

        // Get test distribution
        const testDistribution = await Video.aggregate([
            {
                $group: {
                    _id: '$testType',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    testType: '$_id',
                    count: 1,
                },
            },
            {
                $sort: { count: -1 },
            },
        ])

        return NextResponse.json({
            totalAthletes,
            totalVideos,
            verifiedTests,
            pendingReview,
            performanceData: videosByDay,
            testDistribution,
            recentActivity: recentActivity.map((activity) => ({
                id: activity._id.toString(),
                type: activity.type,
                description: activity.description,
                timestamp: activity.timestamp,
            })),
        })
    } catch (error) {
        console.error('Analytics API error:', error)
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }
}
