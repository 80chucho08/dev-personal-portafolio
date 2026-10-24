import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

const WireframePolyhedron = () => {
  const groupRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!reduceMotion && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.16;
      groupRef.current.rotation.x += delta * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial color="#8A8D88" wireframe transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[0.35, 0.25, 0]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color="#8A8D88" wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
};

export const HeroWireframe = () => (
  <Canvas
    aria-hidden="true"
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 5], fov: 42 }}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
  >
    <WireframePolyhedron />
  </Canvas>
);
