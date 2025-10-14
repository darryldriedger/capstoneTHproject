import express from 'express'
import axios from 'axios'

const r = express.Router()

r.get('/', async (req, res) => {
  const q = (req.query.q || '').toString().trim()
  if(!q) return res.status(400).json({ error: 'Missing q' })

  const key = process.env.OPENCAGE_API_KEY
  try {
    if(key){
      const { data } = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: { q, key, limit: 1, no_annotations: 1 }
      })
      const c = data.results?.[0]
      if(!c) return res.status(404).json({ error: 'No results'})
      return res.json({ name: c.formatted, lat: c.geometry.lat, lon: c.geometry.lng })
    } else {
      // fallback to Nominatim (no key). Respect polite usage.
      const url = 'https://nominatim.openstreetmap.org/search'
      const { data } = await axios.get(url, {
        params: { q, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'weather-on-a-map-starter/1.0 (educational project)' }
      })
      const c = data?.[0]
      if(!c) return res.status(404).json({ error: 'No results'})
      return res.json({ name: c.display_name, lat: Number(c.lat), lon: Number(c.lon) })
    }
  } catch (e){
    res.status(502).json({ error: 'Geocode error', detail: e.message })
  }
})

export default r
