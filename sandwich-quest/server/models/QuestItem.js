import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const QuestItemSchema = new Schema({
    name: { type: String, required: true },
    questId: { type: ObjectId, required: true, ref: 'Quest' },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    restaurantId: { type: String, required: true },
    // myNotes: { type: String, required: true },
    // isChecked: { type: Boolean, default: false, required: true },
    // checkedDate: { type: Date, required: true },
    // itemType: { type: String, required: true },
    // accountId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

QuestItemSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

QuestItemSchema.virtual('quest', {
    localField: 'questId',
    foreignField: '_id',
    ref: 'Quest',
    justOne: true
})