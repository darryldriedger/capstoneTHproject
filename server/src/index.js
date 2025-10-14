import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import forecast from './routes/forecast.js'
import geocode from './routes/geocode.js'
import locations from './routes/locations.js'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(helmet())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/forecast', forecast)
app.use('/api/geocode', geocode)
app.use('/api/locations', locations)

const mongo = process.env.MONGO_URI
if(!mongo){ console.warn('⚠️  MONGO_URI not set. Set it in server/.env') }
else{
  mongoose.connect(mongo).then(()=>console.log('✅ Mongo connected')).catch(e=>console.error('Mongo error', e.message))
}

const port = process.env.PORT || 8081
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`API running on :${port}`))
}
export default app
