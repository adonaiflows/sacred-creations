"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { showcaseState } from "./showcaseState";

// The 1 oz Liquid Gold bottle as photographed: frosted Boston round glass, yellow-gold oil filled to
// the shoulder, bamboo dropper collar, white bulb, and the real wrap-around label (rendered from
// docs/assets/liquid-gold-label.pdf). Units: 1 = body radius.

export const LABEL_URL = "/textures/liquid-gold-label.jpg";

const OIL_LINE = 3.3;

function glassProfile() {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * (Math.PI / 2);
    pts.push(new THREE.Vector2(0.88 + Math.sin(a) * 0.12, 0.12 - Math.cos(a) * 0.12));
  }
  pts.push(new THREE.Vector2(1, 3.1));
  for (let i = 1; i <= 16; i++) {
    const t = (i / 16) * (Math.PI / 2);
    pts.push(new THREE.Vector2(0.62 + 0.38 * Math.cos(t), 3.1 + 0.85 * Math.sin(t)));
  }
  pts.push(new THREE.Vector2(0.6, 4.1), new THREE.Vector2(0, 4.1));
  return pts;
}

function frostedGlass() {
  const geo = new THREE.LatheGeometry(glassProfile(), 96);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const oil = new THREE.Color("#e6cf47");
  const oilDeep = new THREE.Color("#cfae2c");
  const frost = new THREE.Color("#e8dfa4");
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const t = THREE.MathUtils.smoothstep(y, OIL_LINE - 0.06, OIL_LINE + 0.06);
    c.copy(oilDeep).lerp(oil, THREE.MathUtils.clamp(y / 3, 0, 1)).lerp(frost, t);
    c.toArray(colors, i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

// Rubber bulb measured from the fence photo: flared base where it meets the collar, slim straight
// body, round top. Heights relative to the collar's top face.
function bulbProfile() {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  for (let i = 0; i <= 10; i++) {
    const y = (i / 10) * 0.6;
    const t = THREE.MathUtils.smoothstep(y, 0, 0.5);
    pts.push(new THREE.Vector2(THREE.MathUtils.lerp(0.4, 0.3, t), y));
  }
  pts.push(new THREE.Vector2(0.3, 0.83));
  for (let i = 1; i <= 12; i++) {
    const a = (i / 12) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.cos(a) * 0.3, 0.83 + Math.sin(a) * 0.3));
  }
  return pts;
}

function bambooTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#d4a86e";
  g.fillRect(0, 0, c.width, c.height);
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 260; i++) {
    const x = rand() * c.width;
    const w = 0.6 + rand() * 3.5;
    const light = rand() > 0.5;
    g.fillStyle = light ? `rgba(245,214,165,${0.15 + rand() * 0.3})` : `rgba(196,112,48,${0.1 + rand() * 0.3})`;
    g.fillRect(x, 0, w, c.height);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

export function LiquidGoldBottle() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const label = useTexture(LABEL_URL, (t) => {
    const tex = Array.isArray(t) ? t[0] : t;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  });

  const { glass, bamboo, bulb } = useMemo(
    () => ({ glass: frostedGlass(), bamboo: bambooTexture(), bulb: new THREE.LatheGeometry(bulbProfile(), 64) }),
    [],
  );

  // The label art is ~2.5:1 and wraps almost all the way round; centre the front panel (u ≈ 0.29) on the camera.
  const labelArc = Math.PI * 2 * 0.99;
  const labelStart = -0.29 * labelArc;

  // ?poster freezes the bottle front-on, for rendering public/posters/liquid-gold-3d.png.
  const freeze = useMemo(() => window.location.search.includes("poster"), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (freeze) {
      g.rotation.y = -0.35;
      g.position.y = -3.15;
      return;
    }
    if (!showcaseState.dragging) {
      showcaseState.dragVelocity *= Math.pow(0.04, delta);
      spin.current += delta * 0.22;
    }
    spin.current += showcaseState.dragVelocity;
    const scrollTurn = (showcaseState.scroll - 0.5) * 1.4;
    g.rotation.y = spin.current + scrollTurn;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 - 3.15;
  });

  return (
    <group ref={group}>
      <mesh geometry={glass} castShadow>
        <meshPhysicalMaterial
          vertexColors
          roughness={0.42}
          clearcoat={0.5}
          clearcoatRoughness={0.35}
          sheen={0.8}
          sheenColor="#fffbe6"
          sheenRoughness={0.45}
          emissive="#8a7410"
          emissiveIntensity={0.2}
          envMapIntensity={0.7}
        />
      </mesh>
      {/* label */}
      <mesh position={[0, 1.68, 0]}>
        <cylinderGeometry args={[1.012, 1.012, 2.45, 128, 1, true, labelStart, labelArc]} />
        <meshStandardMaterial map={label} roughness={0.85} envMapIntensity={0.5} />
      </mesh>
      {/* bamboo collar */}
      <mesh position={[0, 4.49, 0]}>
        <cylinderGeometry args={[0.74, 0.75, 1.02, 96]} />
        <meshStandardMaterial map={bamboo} roughness={0.62} envMapIntensity={0.7} />
      </mesh>
      <mesh position={[0, 5.0, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.36, 0.74, 96]} />
        <meshStandardMaterial color="#c99a5e" roughness={0.6} />
      </mesh>
      {/* white bulb */}
      <mesh geometry={bulb} position={[0, 5.0, 0]}>
        <meshPhysicalMaterial color="#f4f1ea" roughness={0.55} sheen={0.5} sheenColor="#ffffff" envMapIntensity={0.7} />
      </mesh>
    </group>
  );
}

useTexture.preload(LABEL_URL);
