import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group, Mesh, Points } from "three";
import { useApp } from "@/context/AppContext";
import { profile } from "@/data/content";

function VoxelMark() {
  const group = useRef<Group>(null);
  const cells = useMemo(() => {
    const pattern = [
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
    ];
    const out: [number, number][] = [];
    pattern.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v) out.push([x - 2, 2 - y]);
      }),
    );
    return out;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.35;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
  });

  return (
    <group ref={group}>
      {cells.map(([x, y], i) => (
        <mesh key={i} position={[x * 0.42, y * 0.42, 0]}>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial
            color="#e8c547"
            emissive="#b4922f"
            emissiveIntensity={0.45}
            roughness={0.28}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Crystal() {
  const mesh = useRef<Mesh>(null);
  useFrame((s) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = s.clock.elapsedTime * 0.12;
    mesh.current.rotation.y = s.clock.elapsedTime * 0.18;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={[1.8, 0.2, -0.6]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color="#7af0c6"
          roughness={0.12}
          metalness={0.35}
          transmission={0.7}
          thickness={0.5}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const n = 240;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#e8c547" transparent opacity={0.7} />
    </points>
  );
}

export function HeroScene() {
  const { reduced } = useApp();
  if (reduced) {
    return (
      <div className="flex h-full items-center justify-center">
        <img
          src={profile.avatar}
          alt="Ali Farid GitHub identity"
          className="h-40 w-40 rounded-2xl border border-gold/40"
        />
      </div>
    );
  }
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.75]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={18} color="#e8c547" />
      <pointLight position={[-4, -2, 2]} intensity={10} color="#ff4d2e" />
      <Suspense fallback={null}>
        <VoxelMark />
        <Crystal />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
