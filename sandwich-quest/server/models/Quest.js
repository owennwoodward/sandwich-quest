import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const QuestSchema = new Schema({
    name: { type: String, required: true },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    description: { type: String, required: false }
}, { timestamps: true, toJSON: { virtuals: true } })


QuestSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})