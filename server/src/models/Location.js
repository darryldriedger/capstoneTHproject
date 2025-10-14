import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  userId: { type: String, index: true },
  name: String,
  lat: Number,
  lon: Number
}, { timestamps: true })

export default mongoose.model('Location', schema)
