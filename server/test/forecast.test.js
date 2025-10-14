import request from 'supertest'
import app from '../src/index.js'
import { expect } from 'chai'

describe('API smoke', () => {
  it('rejects bad forecast query', async () => {
    const res = await request(app).get('/api/forecast?lat=999&lon=0')
    expect(res.status).to.equal(400)
  })
})
