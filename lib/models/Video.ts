import mongoose, { Schema, model, models } from 'mongoose'

// This model stores AI-processed statistics from video submissions
// Actual videos are NOT stored - only the analysis results
export interface IVideo {
    _id?: string
    athleteId: string
    testType: string
    submittedAt: Date
    status: 'pending' | 'approved' | 'rejected'
    aiVerification: {
        verified: boolean
        confidence: number
        anomalies: string[]
        metrics: Record<string, number> // e.g., { jumpHeight: 45.2, speed: 12.5 }
    }
    reviewerId?: string
    reviewerNotes?: string
    reviewedAt?: Date
    createdAt?: Date
    updatedAt?: Date
}

const VideoSchema = new Schema<IVideo>(
    {
        athleteId: { type: String, required: true, ref: 'Athlete' },
        testType: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        aiVerification: {
            verified: { type: Boolean, required: true },
            confidence: { type: Number, required: true },
            anomalies: [{ type: String }],
            metrics: { type: Map, of: Number },
        },
        reviewerId: { type: String },
        reviewerNotes: { type: String },
        reviewedAt: { type: Date },
    },
    {
        timestamps: true,
    }
)

// Add indexes
VideoSchema.index({ athleteId: 1 })
VideoSchema.index({ status: 1 })
VideoSchema.index({ submittedAt: -1 })

export default models.Video || model<IVideo>('Video', VideoSchema)
