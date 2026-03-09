"use client";

// ============================================================================
// DiceScene — 3D Dice Roller with react-three-fiber
// Physics-inspired dice roll animation using Three.js
// Wrapped with next/dynamic ssr:false at the page level
// ============================================================================

import { useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Die Mesh Component
// ---------------------------------------------------------------------------

interface DieProps {
  result: number;
  rolling: boolean;
  onRollComplete: () => void;
}

function Die({ result, rolling, onRollComplete }: DieProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const angularVelRef = useRef(new THREE.Euler(0, 0, 0));
  const timeRef = useRef(0);

  // Map result to a target face rotation (d6 faces)
  const targetRotation = useMemo(() => {
    const faceMap: Record<number, THREE.Euler> = {
      1: new THREE.Euler(0, 0, 0),
      2: new THREE.Euler(Math.PI / 2, 0, 0),
      3: new THREE.Euler(0, 0, -Math.PI / 2),
      4: new THREE.Euler(0, 0, Math.PI / 2),
      5: new THREE.Euler(-Math.PI / 2, 0, 0),
      6: new THREE.Euler(Math.PI, 0, 0),
    };
    return faceMap[((result - 1) % 6) + 1] ?? new THREE.Euler(0, 0, 0);
  }, [result]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (rolling) {
      timeRef.current += delta;
      const t = timeRef.current;

      // Phase 1: Chaotic spin (0-1.2s)
      if (t < 1.2) {
        const speed = Math.max(0, 1 - t / 1.4);
        meshRef.current.rotation.x += (8 + Math.sin(t * 3) * 4) * speed * delta;
        meshRef.current.rotation.y += (6 + Math.cos(t * 2) * 3) * speed * delta;
        meshRef.current.rotation.z += (5 + Math.sin(t * 5) * 2) * speed * delta;

        // Bounce height
        meshRef.current.position.y = Math.abs(Math.sin(t * 6)) * (1.5 - t) * 1.2;
        meshRef.current.position.x = Math.sin(t * 2) * 0.3;
        meshRef.current.position.z = Math.cos(t * 3) * 0.2;
      }
      // Phase 2: Settle to target (1.2-2s)
      else if (t < 2.0) {
        const settleT = (t - 1.2) / 0.8; // 0 → 1
        const ease = 1 - Math.pow(1 - settleT, 3); // easeOutCubic

        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          targetRotation.x,
          ease
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          targetRotation.y,
          ease
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          targetRotation.z,
          ease
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          0,
          ease
        );
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
          0,
          ease
        );
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          0,
          ease
        );
      }
      // Phase 3: Done
      else {
        meshRef.current.rotation.copy(targetRotation);
        meshRef.current.position.set(0, 0, 0);
        timeRef.current = 0;
        onRollComplete();
      }
    }
  });

  // D6 face labels
  const facePositions: [number, number, number, number, number, number][] = [
    [0, 0, 0.52, 0, 0, 0],        // front  (1)
    [0, 0.52, 0, -Math.PI / 2, 0, 0], // top (2)
    [-0.52, 0, 0, 0, -Math.PI / 2, 0], // left (3)
    [0.52, 0, 0, 0, Math.PI / 2, 0],  // right (4)
    [0, -0.52, 0, Math.PI / 2, 0, 0], // bottom (5)
    [0, 0, -0.52, Math.PI, 0, 0],     // back (6)
  ];

  return (
    <mesh ref={meshRef} castShadow>
      <RoundedBox args={[1, 1, 1]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Face numbers */}
      {facePositions.map(([px, py, pz, rx, ry, rz], i) => (
        <Text
          key={i}
          position={[px, py, pz]}
          rotation={[rx, ry, rz]}
          fontSize={0.45}
          color="#d4a574"
          font="/fonts/inter.woff"
          anchorX="center"
          anchorY="middle"
        >
          {String(i + 1)}
        </Text>
      ))}
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Ground Plane
// ---------------------------------------------------------------------------

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      <ContactShadows
        position={[0, -0.49, 0]}
        opacity={0.6}
        scale={5}
        blur={2}
        far={4}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main DiceScene Component
// ---------------------------------------------------------------------------

interface DiceSceneProps {
  result: number;
  onRoll: () => void;
  rolling: boolean;
  onRollComplete: () => void;
}

export function DiceScene({ result, rolling, onRollComplete }: DiceSceneProps) {
  return (
    <div className="w-full h-[300px] rounded-card overflow-hidden border border-border bg-abyss">
      <Canvas
        shadows
        camera={{ position: [0, 3, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, -2]} color="#d4a574" intensity={0.5} />

        <Die
          result={result}
          rolling={rolling}
          onRollComplete={onRollComplete}
        />
        <Ground />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
