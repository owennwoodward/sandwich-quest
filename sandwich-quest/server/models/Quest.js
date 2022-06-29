import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const QuestSchema = new Schema({
    name: { type: String, required: true },
    creatorId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })


QuestSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})