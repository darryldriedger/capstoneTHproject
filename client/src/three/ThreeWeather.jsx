import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  MeshReflectorMaterial,
  Text,
  Environment,
  Float,
} from "@react-three/drei";
import LabBuilding from "./LabBuilding";
import { SearchPanel, SavedPanel, FloorForecast  } from "./Panels";
import NeonTitle from "./NeonTitle";

// --- simple rotating "building" placeholder ---

function AnimatedFog() {
  const fogRef = useRef();
  useFrame(({ clock }) => {
    if (fogRef.current) {
      fogRef.current.near = 4 + Math.sin(clock.elapsedTime * 0.3) * 0.5;
      fogRef.current.far = 15 + Math.cos(clock.elapsedTime * 0.3) * 0.5;
    }
  });
  return <fog ref={fogRef} attach="fog" args={["#0b132b", 4, 15]} />;
}


function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[4, 6]} />
      <MeshReflectorMaterial
        color="#07090f"
        blur={[300, 60]}
        resolution={1024}
        mixBlur={1}
        mixStrength={8}
        roughness={0.6}
        metalness={0.4}
      />
    </mesh>
  );
}



export default function ThreeWeather({
  q,
  setQ,
  saved,
  onDelete,
  place,
  forecast,
  onSearchSubmit,
  onSave
}) {
  return (
    <Canvas
      camera={{ position: [2, 0.5, 1], fov: 80 }}
      shadows
    >
      <color attach="background" args={["#05070c"]} />
      <fog attach="fog" args={["#34d399", 10, 30]} />
      <ambientLight intensity={0.1} color="#34d399" />
      <spotLight position={[4, 6, 3]} angle={0.6} penumbra={0.8} intensity={2} color="#34d399" castShadow />
      <Environment preset="city" />
      <Floor /><AnimatedFog /> 
      

    <LabBuilding/>

      <SearchPanel
        q={q}
        setQ={setQ}
        onSearchSubmit={onSearchSubmit}
        place={place}
        onSave={onSave}
      />
      <SavedPanel saved={saved} onDelete={onDelete} />
      <FloorForecast forecast={forecast} anchor={[1.3, -0.98, 0]} />
     {/* little neon glow for the title */}
      <pointLight position={[0, 0.8, 0]} intensity={4} distance={2} color="#34d399" />
        
      <NeonTitle />

      <OrbitControls enableDamping dampingFactor={0.1} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}

