import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { QuestSchema } from '../models/Quest';
import { QuestItemSchema } from '../models/QuestItem';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Quest = mongoose.model('Quest', QuestSchema)
  QuestItem = mongoose.model('QuestItem', QuestItemSchema)
}

export const dbContext = new DbContext()
