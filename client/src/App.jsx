// client/src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import ThreeWeather from "./three/ThreeWeather";

const API = import.meta.env.VITE_SERVER_URL ?? ""; // e.g. http://localhost:8081

function getOrCreateUserId() {
  const k = "userId";
  let v = localStorage.getItem(k);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(k, v);
  }
  return v;
}

export default function App() {
  const userId = useMemo(getOrCreateUserId, []);
  const [q, setQ] = useState("Calgary");
  const [place, setPlace] = useState(null);        // { name, lat, lon }
  const [forecast, setForecast] = useState(null);  // { place, data }
  const [saved, setSaved] = useState([]);          // [{ _id, name, lat, lon }]

  // Load saved locations on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/locations?userId=${userId}`);
        const data = await res.json();
        setSaved(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("Failed to load saved locations", e);
      }
    })();
  }, [userId]);

  // --- handlers -------------------------------------------------------------

  async function handleSearchSubmit(e) {
    e?.preventDefault?.();
    try {
      // 1) geocode the query -> place
      const geo = await fetch(`${API}/api/geocode?q=${encodeURIComponent(q)}`);
      const g = await geo.json();
      if (!g || !g.lat || !g.lon) return;

      const nextPlace = { name: g.name ?? q, lat: g.lat, lon: g.lon };
      setPlace(nextPlace);

      // 2) fetch forecast for that place
      const fx = await fetch(`${API}/api/forecast?lat=${g.lat}&lon=${g.lon}`);
      const data = await fx.json();

      setForecast({ place: nextPlace, data });
    } catch (err) {
      console.error("Search failed:", err);
    }
  }

  async function handleSave() {
    try {
      if (!place) return;
      const res = await fetch(`${API}/api/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name: place.name, lat: place.lat, lon: place.lon }),
      });
      const doc = await res.json();
      if (doc && doc._id) setSaved((prev) => [doc, ...prev]);
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API}/api/locations/${id}`, { method: "DELETE" });
      setSaved((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // -------------------------------------------------------------------------

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ThreeWeather
        q={q}
        setQ={setQ}
        place={place}
        forecast={forecast}
        saved={saved}
        onSearchSubmit={handleSearchSubmit}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
