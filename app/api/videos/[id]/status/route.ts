import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Video from '@/lib/models/Video'

// PATCH /api/videos/[id]/status - Update video status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json() as { status: 'approved' | 'rejected'; notes?: string }

    const video = await Video.findByIdAndUpdate(
      id,
      {
        status: body.status,
        ...(body.notes && { reviewerNotes: body.notes }),
      },
      { new: true }
    ).lean()

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: video._id.toString(),
      athleteId: video.athleteId,
      athleteName: '', // Will be populated from athlete data if needed
      testType: video.testType,
      videoUrl: video.videoUrl || '',
      submittedAt: video.submittedAt,
      status: video.status,
      aiVerification: video.aiVerification,
      reviewerNotes: video.reviewerNotes,
    })
  } catch (error) {
    console.error('Video status update error:', error)
    return NextResponse.json({ error: 'Failed to update video status' }, { status: 500 })
  }
}

