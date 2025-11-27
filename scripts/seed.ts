/**
 * Seed script to populate MongoDB with initial data
 * Run: npx ts-node scripts/seed.ts
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env' })

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file')
    process.exit(1)
}

// Models  (we'll import them dynamically after connection)
let Athlete: any
let Video: any
let Activity: any

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('✓ Connected to MongoDB')

        // Import models after connection
        Athlete = (await import('../lib/models/Athlete')).default
        Video = (await import('../lib/models/Video')).default
        Activity = (await import('../lib/models/Activity')).default
    } catch (error) {
        console.error('✗ MongoDB connection error:', error)
        process.exit(1)
    }
}

async function clearDatabase() {
    console.log('\nClearing existing data...')
    await Athlete.deleteMany({})
    await Video.deleteMany({})
    await Activity.deleteMany({})
    console.log('✓ Database cleared')
}

async function seedAthletes() {
    console.log('\nSeeding athletes...')

    const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat', 'Punjab', 'Haryana']
    const cities = ['Mumbai', 'Bangalore', 'Chennai', 'Delhi', 'Ahmedabad', 'Ludhiana', 'Gurugram']
    const names = [
        'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Singh', 'Vikram Reddy',
        'Anita Desai', 'Rahul Verma', 'Kavita Nair', 'Sanjay Gupta', 'Meera Iyer',
        'Karan Singh', 'Pooja Mehta', 'Arjun Rao', 'Divya Pandey', 'Rohit Shah'
    ]

    const athletes = []

    for (let i = 0; i < 15; i++) {
        const stateIndex = i % states.length
        athletes.push({
            name: names[i],
            email: `${names[i].toLowerCase().replace(' ', '.')}@example.com`,
            age: 18 + Math.floor(Math.random() * 12), // 18-30 years
            gender: i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'male',
            location: cities[stateIndex],
            state: states[stateIndex],
            phoneNumber: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            testsCompleted: Math.floor(Math.random() * 5),
            status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'verified',
        })
    }

    const createdAthletes = await Athlete.insertMany(athletes)
    console.log(`✓ Created ${createdAthletes.length} athletes`)

    return createdAthletes
}

async function seedVideos(athletes: any[]) {
    console.log('\nSeeding videos...')

    const testTypes = ['Vertical Jump', 'Sit-ups', 'Push-ups', '100m Run', 'Flexibility']
    const videos = []

    for (const athlete of athletes) {
        const numVideos = Math.floor(Math.random() * 3) + 1 // 1-3 videos per athlete

        for (let i = 0; i < numVideos; i++) {
            const testType = testTypes[Math.floor(Math.random() * testTypes.length)]
            const submittedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days

            videos.push({
                athleteId: athlete._id.toString(),
                testType,
                videoUrl: `https://example.com/videos/${athlete._id}_${i}.mp4`,
                thumbnailUrl: `https://example.com/thumbnails/${athlete._id}_${i}.jpg`,
                submittedAt,
                status: Math.random() > 0.3 ? 'approved' : Math.random() > 0.5 ? 'pending' : 'rejected',
                aiVerification: {
                    verified: Math.random() > 0.2,
                    confidence: 0.7 + Math.random() * 0.3,
                    anomalies: Math.random() > 0.8 ? ['Minor movement anomaly detected'] : [],
                    metrics: {
                        [testType === 'Vertical Jump' ? 'jumpHeight' : 'reps']:
                            testType === 'Vertical Jump' ? Math.random() * 30 + 40 : Math.floor(Math.random() * 30) + 20
                    }
                },
            })
        }
    }

    const createdVideos = await Video.insertMany(videos)
    console.log(`✓ Created ${createdVideos.length} videos`)

    return createdVideos
}

async function seedActivities(athletes: any[], videos: any[]) {
    console.log('\nSeeding activities...')

    const activities = []

    // Create activities for recent videos
    for (let i = 0; i < Math.min(10, videos.length); i++) {
        const video = videos[i]
        const athlete = athletes.find(a => a._id.toString() === video.athleteId)

        activities.push({
            type: 'video_submitted',
            description: `New video submitted by ${athlete?.name || 'Athlete'}`,
            athleteId: video.athleteId,
            videoId: video._id.toString(),
            timestamp: video.submittedAt,
        })

        if (video.status === 'approved') {
            activities.push({
                type: 'test_verified',
                description: `${video.testType} test verified for ${athlete?.name || 'Athlete'}`,
                athleteId: video.athleteId,
                videoId: video._id.toString(),
                timestamp: new Date(video.submittedAt.getTime() + Math.random() * 24 * 60 * 60 * 1000),
            })
        }
    }

    const createdActivities = await Activity.insertMany(activities)
    console.log(`✓ Created ${createdActivities.length} activities`)
}

async function main() {
    console.log('🌱 Starting database seeding...')

    await connectDB()
    await clearDatabase()

    const athletes = await seedAthletes()
    const videos = await seedVideos(athletes)
    await seedActivities(athletes, videos)

    console.log('\n✓ Seeding completed successfully! 🎉')
    console.log('\nDatabase Summary:')
    console.log(`  Athletes: ${athletes.length}`)
    console.log(`  Videos: ${videos.length}`)
    console.log(`  Activities: ${await Activity.countDocuments()}`)

    await mongoose.connection.close()
    console.log('\n✓ Database connection closed')
}

main().catch((error) => {
    console.error('✗ Seeding failed:', error)
    process.exit(1)
})
