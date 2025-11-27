import mongoose, { Schema, model, models } from 'mongoose'

export interface IAthlete {
    _id?: string
    name: string
    email: string
    age: number
    gender: 'male' | 'female' | 'other'
    location: string
    state: string
    phoneNumber?: string
    profileImage?: string
    testsCompleted: number
    createdAt?: Date
    updatedAt?: Date
}

const AthleteSchema = new Schema<IAthlete>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        location: { type: String, required: true },
        state: { type: String, required: true },
        phoneNumber: { type: String },
        profileImage: { type: String },
        testsCompleted: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
)

// Add indexes for better query performance
AthleteSchema.index({ email: 1 })
AthleteSchema.index({ name: 'text', location: 'text', state: 'text' })

export default models.Athlete || model<IAthlete>('Athlete', AthleteSchema)
