import mongoose, { Schema, model, models } from 'mongoose'

export interface IAcademy {
    _id?: string
    name: string
    email: string
    contactPerson: string
    phoneNumber: string
    location: string
    state: string
    athletesReviewed: number
    athletesApproved: number
    athletesRejected: number
    status: 'active' | 'inactive'
    createdAt?: Date
    updatedAt?: Date
}

const AcademySchema = new Schema<IAcademy>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contactPerson: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        location: { type: String, required: true },
        state: { type: String, required: true },
        athletesReviewed: { type: Number, default: 0 },
        athletesApproved: { type: Number, default: 0 },
        athletesRejected: { type: Number, default: 0 },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    },
    {
        timestamps: true,
    }
)

// Add indexes
AcademySchema.index({ email: 1 })
AcademySchema.index({ status: 1 })
AcademySchema.index({ name: 'text', location: 'text' })

export default models.Academy || model<IAcademy>('Academy', AcademySchema)
