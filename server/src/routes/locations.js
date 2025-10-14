import express from 'express'
import { z } from 'zod'
import Location from '../models/Location.js'

const r = express.Router()

r.get('/', async (req, res) => {
  const userId = (req.query.userId || '').toString()
  if(!userId) return res.status(400).json({ error: 'Missing userId' })
  const items = await Location.find({ userId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

r.post('/', async (req, res) => {
  const schema = z.object({
    userId: z.string().min(3),
    name: z.string().min(1),
    lat: z.number(),
    lon: z.number()
  })
  const parsed = schema.safeParse(req.body)
  if(!parsed.success) return res.status(400).json({ error: 'Invalid body' })
  const doc = await Location.create(parsed.data)
  res.status(201).json(doc)
})

r.delete('/:id', async (req, res) => {
  const id = req.params.id
  const userId = (req.query.userId || '').toString()
  if(!userId) return res.status(400).json({ error: 'Missing userId' })
  await Location.deleteOne({ _id: id, userId })
  res.json({ ok: true })
})

export default r
