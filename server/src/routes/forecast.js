import express from 'express'
import axios from 'axios'
import { z } from 'zod'

const r = express.Router()

r.get('/', async (req, res) => {
  const schema = z.object({
    lat: z.coerce.number().min(-90).max(90),
    lon: z.coerce.number().min(-180).max(180),
    units: z.enum(['metric','imperial']).optional()
  })
  const parsed = schema.safeParse(req.query)
  if(!parsed.success) return res.status(400).json({ error: 'Invalid query' })
  const { lat, lon } = parsed.data

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'temperature_2m,precipitation',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto'
  })
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`

  try{
    const { data } = await axios.get(url, { timeout: 10000 })
    res.json(data)
  }catch(e){
    res.status(502).json({ error: 'Upstream error', detail: e.message })
  }
})

export default r
