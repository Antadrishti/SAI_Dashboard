import mongoose, { Schema, model, models } from 'mongoose'

export interface IActivity {
    _id?: string
    type: string
    description: string
    athleteId?: string
    videoId?: string
    timestamp: Date
    metadata?: Record<string, any>
}

const ActivitySchema = new Schema<IActivity>({
    type: { type: String, required: true },
    description: { type: String, required: true },
    athleteId: { type: String, ref: 'Athlete' },
    videoId: { type: String, ref: 'Video' },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Map, of: Schema.Types.Mixed },
})

// Add index for timestamp-based queries
ActivitySchema.index({ timestamp: -1 })

export default models.Activity || model<IActivity>('Activity', ActivitySchema)
