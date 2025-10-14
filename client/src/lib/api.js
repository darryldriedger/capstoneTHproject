const BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'

export async function searchCity(q){
  const res = await fetch(`${BASE}/api/geocode?q=${encodeURIComponent(q)}`)
  if(!res.ok) return null
  return res.json()
}

export async function getForecast(lat, lon){
  const res = await fetch(`${BASE}/api/forecast?lat=${lat}&lon=${lon}`)
  if(!res.ok) throw new Error('Forecast error')
  return res.json()
}

export async function listLocations(userId){
  const res = await fetch(`${BASE}/api/locations?userId=${encodeURIComponent(userId)}`)
  if(!res.ok) return []
  return res.json()
}

export async function saveLocation(body){
  const res = await fetch(`${BASE}/api/locations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if(!res.ok) throw new Error('Save error')
  return res.json()
}

export async function deleteLocation(id, userId){
  const res = await fetch(`${BASE}/api/locations/${id}?userId=${encodeURIComponent(userId)}`, { method: 'DELETE' })
  if(!res.ok) throw new Error('Delete error')
  return res.json()
}
