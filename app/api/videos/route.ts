import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Video from '@/lib/models/Video'

// GET /api/videos - Get all videos with filtering
export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const athleteId = searchParams.get('athleteId')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        // Build query
        let query: any = {}
        if (status) query.status = status
        if (athleteId) query.athleteId = athleteId

        // Get total count
        const total = await Video.countDocuments(query)

        // Get paginated videos
        const videos = await Video.find(query)
            .sort({ submittedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()

        return NextResponse.json({
            videos: videos.map((video) => ({
                id: video._id.toString(),
                athleteId: video.athleteId,
                athleteName: '', // Will be populated from athlete data if needed
                testType: video.testType,
                videoUrl: video.videoUrl,
                thumbnailUrl: video.thumbnailUrl,
                submittedAt: video.submittedAt,
                status: video.status,
                aiVerification: video.aiVerification,
                reviewerNotes: video.reviewerNotes,
            })),
            total,
        })
    } catch (error) {
        console.error('Videos GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
    }
}

// POST /api/videos - Create new video submission
export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const video = await Video.create(body)
        const videoObj = video.toObject()

        return NextResponse.json({
            id: videoObj._id.toString(),
            athleteId: videoObj.athleteId,
            testType: videoObj.testType,
            videoUrl: videoObj.videoUrl,
            status: videoObj.status,
            aiVerification: videoObj.aiVerification,
        }, { status: 201 })
    } catch (error) {
        console.error('Videos POST error:', error)
        return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
    }
}
