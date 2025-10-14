import React, { useEffect, useMemo, useState } from 'react'
import { searchCity, getForecast, listLocations, saveLocation, deleteLocation } from './lib/api.js'

const uuid = () => crypto.randomUUID()

export default function App(){
  const [q, setQ] = useState('Calgary')
  const [coords, setCoords] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(localStorage.getItem('woam_user') || '')
  const [saved, setSaved] = useState([])

  useEffect(() => {
    if(!userId){ const id = uuid(); localStorage.setItem('woam_user', id); setUserId(id) }
  }, [])

  // load saved
  useEffect(() => {
    if(userId){
      listLocations(userId).then(setSaved).catch(()=>{})
    }
  }, [userId])

  async function onSearch(e){
    e.preventDefault()
    setLoading(true)
    setForecast(null)
    try{
      const place = await searchCity(q)
      if(place){
        setCoords(place)
        const data = await getForecast(place.lat, place.lon)
        setForecast({ place, data })
      } else {
        alert('No results. Try another query.')
      }
    } finally { setLoading(false) }
  }

  async function onSave(){
    if(!coords || !userId) return
    const item = await saveLocation({ userId, name: coords.name, lat: coords.lat, lon: coords.lon })
    setSaved(prev => [item, ...prev])
  }

  async function onDelete(id){
    await deleteLocation(id, userId)
    setSaved(prev => prev.filter(x => x._id !== id))
  }

  return (
    <div>
      <header>
        <strong>Weather on a Map</strong>
        <form onSubmit={onSearch} className="row">
          <input type="text" value={q} onChange={e=>setQ(e.target.value)}
                 placeholder="Search city..." required minLength={2} />
          <button>Search</button>
        </form>
        <span className="badge">User: {userId.slice(0,8)}</span>
      </header>

      <div className="container grid">
        <section className="card">
          <h3>Forecast</h3>
          {!forecast && !loading && <p className="muted">Search a city to see the forecast.</p>}
          {loading && <p>Loading...</p>}
          {forecast && (
            <div>
              <div className="row" style={{justifyContent:'space-between'}}>
                <div>
                  <h4 style={{margin:'6px 0'}}>{forecast.place.name}</h4>
                  <div className="muted">{forecast.place.lat.toFixed(3)}, {forecast.place.lon.toFixed(3)}</div>
                </div>
                <div className="row">
                  <button onClick={onSave} className="secondary">Save location</button>
                </div>
              </div>
              {forecast.data?.daily && (
                <ul>
                  {forecast.data.daily.time.map((d, i) => (
                    <li key={d}>
                      <strong>{d}</strong> — min {forecast.data.daily.temperature_2m_min[i]}°C,
                      max {forecast.data.daily.temperature_2m_max[i]}°C,
                      precip {forecast.data.daily.precipitation_sum[i]}mm
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <aside className="card">
          <h3>Saved Locations</h3>
          {saved.length === 0 ? <p className="muted">No saved locations yet.</p> : (
            <ul>
              {saved.map(loc => (
                <li key={loc._id}>
                  <div className="row" style={{justifyContent:'space-between'}}>
                    <span>{loc.name} <span className="muted">({loc.lat.toFixed(2)}, {loc.lon.toFixed(2)})</span></span>
                    <button className="secondary" onClick={()=>onDelete(loc._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  )
}
