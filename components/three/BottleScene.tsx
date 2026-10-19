"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { LiquidGoldBottle } from "./LiquidGoldBottle";

type Props = {
  active: boolean;
  onReady: () => void;
};

export default function BottleScene({ active, onReady }: Props) {
  const [dpr, setDpr] = useState(1.75);

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.4, 15], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => setTimeout(onReady, 250)}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.12} />
      {/* late-afternoon sun, as in the product photos */}
      <directionalLight position={[5, 5, 4]} intensity={2.6} color="#ffeccb" />
      <directionalLight position={[-6, 3, -2]} intensity={1.2} color="#ffcf7a" />
      <LiquidGoldBottle />
      <ContactShadows position={[0, -3.17, 0]} opacity={0.4} scale={5} blur={2.8} far={1.5} color="#6a3a1c" frames={1} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.8} position={[0, 5, -3]} scale={[10, 3, 1]} color="#fff2da" />
        <Lightformer intensity={1.5} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[5, 8, 1]} color="#ffe2a8" />
        <Lightformer intensity={1.1} position={[5, 0, 3]} rotation-y={-Math.PI / 2} scale={[4, 7, 1]} color="#ffffff" />
        <Lightformer intensity={0.6} position={[0, -4, 4]} scale={[8, 1, 1]} color="#c67926" />
      </Environment>
    </Canvas>
  );
}
