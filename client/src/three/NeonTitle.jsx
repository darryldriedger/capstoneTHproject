import React, { useRef } from "react";
import { Float, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NeonTitle() {
  const mat = useRef();

  // Animate emissive intensity for a subtle neon flicker
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const base = 1.6;
    const flicker = Math.sin(t * 8.0) * 0.18 + Math.sin(t * 3.7) * 0.12;
    if (mat.current) mat.current.emissiveIntensity = base + flicker;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={[-0.5, 0.15, 0.65]} rotation={[0, THREE.MathUtils.degToRad(60), 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.2}
          height={0.18}            // thickness
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.02}
          bevelSegments={8}
          curveSegments={12}
        >
          Weather Lab
          <meshStandardMaterial
            ref={mat}
            color="#ff0099"
            emissive="#ff0099"
            emissiveIntensity={4}
            metalness={0.1}
            roughness={0.35}
          />
        </Text3D>

        {/* neon aura lights */}
        <pointLight position={[0.0, 0.15, 0.6]} intensity={2.1} distance={6} color="#ff00cc" />
        <pointLight position={[0.0, 0.15,-0.6]} intensity={1.4} distance={7} color="#ff66ff" />
      </group>
    </Float>
  );
}
