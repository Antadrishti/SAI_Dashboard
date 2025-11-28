import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Athlete from '@/lib/models/Athlete'

// GET /api/athletes - Get all athletes with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search') || ''
        const filter = searchParams.get('filter') || 'all'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        // Build query
        let query: any = {}

        // Apply search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } },
            ]
        }

        // Get total count
        const total = await Athlete.countDocuments(query)

        // Get paginated athletes
        const athletes = await Athlete.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()

        return NextResponse.json({
            athletes: athletes.map((athlete) => ({
                id: athlete._id.toString(),
                name: athlete.name,
                age: athlete.age,
                gender: athlete.gender,
                location: athlete.location,
                state: athlete.state,
                testsCompleted: athlete.testsCompleted,
                profileImage: athlete.profileImage,
            })),
            total,
        })
    } catch (error) {
        console.error('Athletes GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch athletes' }, { status: 500 })
    }
}

// POST /api/athletes - Create new athlete
export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json() as any
        const athlete = await Athlete.create(body) as any

        return NextResponse.json({
            id: athlete._id?.toString() || '',
            name: athlete.name,
            email: athlete.email,
            age: athlete.age,
            gender: athlete.gender,
            location: athlete.location,
            state: athlete.state,
            testsCompleted: athlete.testsCompleted || 0,
        }, { status: 201 })
    } catch (error) {
        console.error('Athletes POST error:', error)
        return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 })
    }
}
