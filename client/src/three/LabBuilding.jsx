import React, { useMemo } from "react";
import { useGLTF, Center } from "@react-three/drei";

export default function LabBuilding(props) {
  const { scene } = useGLTF("/models/low-poly_laboratory.glb");

  // one-time material/shadow tweaks
  useMemo(() => {
    scene.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
        if (c.material) {
          c.material.roughness = 0.5;
          c.material.metalness = 0.2;
        }
      }
    });
  }, [scene]);

  return (
    // bottom => put the model's lowest point at y = 0
    <Center bottom position={[0, 0.02, 0]}>
      <primitive object={scene} scale={0.6} rotation={[0, Math.PI / 8, 0]} {...props} />
    </Center>
  );
}
useGLTF.preload("/models/low-poly_laboratory.glb");
