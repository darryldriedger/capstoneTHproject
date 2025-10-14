# Weather on a Map (Starter)

Minimal starter monorepo for a full‑stack JS capstone:
- Client: React (Vite) + simple CSS + MapLibre-ready
- Server: Express + Mongoose
- DB: MongoDB Atlas
- APIs: Open‑Meteo (forecast) + OpenCage or Nominatim (geocode)

## Quickstart

```bash
npm install
npm --prefix server install
npm --prefix client install

# copy envs
cp .env.example server/.env
cp .env.example client/.env

# set values in server/.env (MONGO_URI at least)
npm run dev
```

Client: http://localhost:5173  
Server: http://localhost:8080

## Deploy (high level)
- API → Render (add envs: MONGO_URI, OPENCAGE_API_KEY, PORT from Render)
- Client → Vercel (envs: VITE_SERVER_URL, VITE_MAPTILER_KEY)