import mongoose, { Schema, model, models } from 'mongoose'

export interface IAthleteReview {
    _id?: string
    athleteId: string
    academyId: string
    academyName: string
    status: 'approved' | 'rejected'
    notes: string
    reviewedBy: string
    reviewedAt: Date
    createdAt?: Date
}

const AthleteReviewSchema = new Schema<IAthleteReview>(
    {
        athleteId: { type: String, required: true },
        academyId: { type: String, required: true },
        academyName: { type: String, required: true },
        status: { type: String, enum: ['approved', 'rejected'], required: true },
        notes: { type: String, required: true },
        reviewedBy: { type: String, required: true },
        reviewedAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
)

// Add indexes
AthleteReviewSchema.index({ athleteId: 1 })
AthleteReviewSchema.index({ academyId: 1 })
AthleteReviewSchema.index({ reviewedAt: -1 })

export default models.AthleteReview || model<IAthleteReview>('AthleteReview', AthleteReviewSchema)
