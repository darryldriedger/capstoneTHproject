import React from "react";
import { Html, Text } from "@react-three/drei";

/* -------------------------------- Search -------------------------------- */
export function SearchPanel({ onSearchSubmit, q, setQ, place, onSave }) {
  return (
    <group position={[0.2, 0.8, 0]} rotation={[0, Math.PI / 3, 0]}>
      <mesh>
        {/* <planeGeometry args={[1.3, 0.9]} /> */}
        <meshStandardMaterial color="#0f172a" roughness={0.85} />
      </mesh>
      <Html transform distanceFactor={1.9} position={[0, 0, 0]} style={{ width: 240 }}>
        <div style={{ background:"#0b1220cc", border:"1px solid #34d399", padding:12, borderRadius:10 }}>
          <h4 style={{margin:"0 0 8px", color:"#ff0099"}}>Search</h4>
          <form onSubmit={onSearchSubmit} style={{display:"flex", gap:8}}>
            <input
              required
              minLength={2}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="City…"
              style={{flex:1, padding:"8px 10px", borderRadius:8, border:"1px solid #34d399", background:"#0b1324", color:"#ffffffff"}}
            />
            <button style={{padding:"8px 12px", borderRadius:8, border:0, background:"#34d399", color:"#001116"}}>Go</button>
          </form>
          {place && (
            <div style={{marginTop:8, display:"flex", justifyContent:"space-between", color:"#34d399"}}>
              <span>{place.name}</span>
              <button onClick={onSave} style={{padding:"6px 10px", borderRadius:8, border:"1px solid #34d399", background:"#0b1324", color:"#ff0099"}}>Save</button>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/* ------------------------------ Saved list ------------------------------ */
export function SavedPanel({ saved, onDelete }) {
  return (
    <group position={[1, 0.8, -1]} rotation={[0, Math.PI / 9, 0]}>
      <mesh>
        {/* <planeGeometry args={[1.3, 0.9]} /> */}
        <meshStandardMaterial color="#0f172a" roughness={0.85} />
      </mesh>
      <Html transform distanceFactor={1.9} position={[0, 0, 0]} style={{ width: 240 }}>
        <div style={{ background:"#0b1220cc", border:"1px solid #34d399", padding:12, borderRadius:10, maxHeight:260, overflow:"auto" }}>
          <h4 style={{margin:"0 0 8px", color:"#ff0099"}}>Saved Places</h4>
          {saved.length === 0 ? (
            <p style={{color:"#34d399"}}>None yet.</p>
          ) : (
            <ul style={{listStyle:"none", padding:0, margin:0}}>
              {saved.map((s) => (
                <li key={s._id} style={{display:"flex", justifyContent:"space-between", gap:8, padding:"6px 0", borderBottom:"1px dashed #263244"}}>
                  <span style={{color:"#34d399"}}>{s.name}</span>
                  <button
                    onClick={() => onDelete(s._id)}
                    style={{border:0, background:"#1f2937", color:"#34d399", borderRadius:6, padding:"4px 6px"}}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Html>
    </group>
  );
}

/* --------------------------- Floor forecast text --------------------------- */

export function FloorForecast({ forecast }) {
  if (!forecast?.data?.daily) return null;
  const d = forecast.data.daily;

  return (
    // Lay flat on the floor: rotate -90° around X
    <group position={[0.4, -0.98, -0.8]} rotation={[-Math.PI / 2, 0, 0.365]}>
      <Text
        fontSize={0.07}
        color="#34d399"
        anchorX="left"
        anchorY="top"
        outlineWidth={0.006}
        outlineColor="#0b132b"
        // keep bright under tone mapping
        material-toneMapped={false}
      >
        {forecast.place.name}
      </Text>

      {d.time.slice(0, 5).map((t, i) => (
        <Text
          key={t}
          position={[0, -(0.16 * (i + 1)), 0]} // step each line “down” along Y (remember we rotated, so Y is along the floor now)
          fontSize={0.06}
          color="#34d399"
          anchorX="left"
          anchorY="top"
          outlineWidth={0.003}
          outlineColor="#0b132b"
          material-toneMapped={false}
        >
          {`${t}  |  min ${d.temperature_2m_min[i]}°  max ${d.temperature_2m_max[i]}°  precip ${d.precipitation_sum[i]}mm`}
        </Text>
      ))}
    </group>
  );
}
