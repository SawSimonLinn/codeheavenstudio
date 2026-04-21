"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

import { WHITE, CLOUD, ARM, DARK, PINK, BLUE1, BLUE2, BLUE3, GOLD, NAVY, SCREEN } from "@/lib/colors";

// ── Cloud body (overlapping sphere puffs) ───────────────────────────────────
function CloudBody() {
  return (
    <group>
      <mesh castShadow>
        <sphereGeometry args={[1.0, 22, 22]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      <mesh position={[0, 0.84, 0]} castShadow>
        <sphereGeometry args={[0.78, 18, 18]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      <mesh position={[-0.82, 0.12, 0]} castShadow>
        <sphereGeometry args={[0.68, 16, 16]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      <mesh position={[0.82, 0.12, 0]} castShadow>
        <sphereGeometry args={[0.68, 16, 16]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      <mesh position={[-0.5, -0.44, 0]} castShadow>
        <sphereGeometry args={[0.52, 14, 14]} />
        <meshLambertMaterial color={CLOUD} />
      </mesh>
      <mesh position={[0.5, -0.44, 0]} castShadow>
        <sphereGeometry args={[0.52, 14, 14]} />
        <meshLambertMaterial color={CLOUD} />
      </mesh>
    </group>
  );
}

// ── Happy face ───────────────────────────────────────────────────────────────
function FaceHappy() {
  const smilePts: [number, number, number][] = [-2, -1, 0, 1, 2].map((i) => {
    const a = (i / 4) * Math.PI * 0.72;
    return [Math.sin(a) * 0.28, -0.12 - Math.cos(a) * 0.1 + 0.1, 0.91];
  });
  return (
    <group>
      {/* Eyes */}
      <mesh position={[-0.32, 0.16, 0.9]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshLambertMaterial color={DARK} />
      </mesh>
      <mesh position={[-0.26, 0.21, 0.97]}>
        <sphereGeometry args={[0.034, 6, 6]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      <mesh position={[0.32, 0.16, 0.9]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshLambertMaterial color={DARK} />
      </mesh>
      <mesh position={[0.38, 0.21, 0.97]}>
        <sphereGeometry args={[0.034, 6, 6]} />
        <meshLambertMaterial color={WHITE} />
      </mesh>
      {/* Smile */}
      {smilePts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.058, 8, 8]} />
          <meshLambertMaterial color={DARK} />
        </mesh>
      ))}
      {/* Blush */}
      <mesh position={[-0.54, -0.06, 0.84]} scale={[1, 0.55, 0.7]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={PINK} transparent opacity={0.65} />
      </mesh>
      <mesh position={[0.54, -0.06, 0.84]} scale={[1, 0.55, 0.7]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={PINK} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// ── Coder / focused face (glasses) ──────────────────────────────────────────
function FaceCoder() {
  return (
    <group>
      {/* Glasses left */}
      <mesh position={[-0.3, 0.15, 0.91]}>
        <torusGeometry args={[0.18, 0.025, 8, 24]} />
        <meshLambertMaterial color={NAVY} />
      </mesh>
      {/* Glasses right */}
      <mesh position={[0.3, 0.15, 0.91]}>
        <torusGeometry args={[0.18, 0.025, 8, 24]} />
        <meshLambertMaterial color={NAVY} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0.15, 0.91]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 8]} />
        <meshLambertMaterial color={NAVY} />
      </mesh>
      {/* Eyes behind lenses */}
      <mesh position={[-0.3, 0.15, 0.9]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshLambertMaterial color={DARK} />
      </mesh>
      <mesh position={[0.3, 0.15, 0.9]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshLambertMaterial color={DARK} />
      </mesh>
      {/* Determined flat mouth */}
      {[-1, 0, 1].map((i) => (
        <mesh key={i} position={[i * 0.14, -0.16, 0.91]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshLambertMaterial color={DARK} />
        </mesh>
      ))}
    </group>
  );
}

// ── Sleeping face ────────────────────────────────────────────────────────────
function FaceSleeping() {
  // Closed eye arcs
  const leftArc: [number, number, number][] = [-1, 0, 1].map((i) => [
    -0.32 + i * 0.07,
    0.15 + Math.abs(i) * 0.045,
    0.91,
  ]);
  const rightArc: [number, number, number][] = [-1, 0, 1].map((i) => [
    0.32 + i * 0.07,
    0.15 + Math.abs(i) * 0.045,
    0.91,
  ]);
  return (
    <group>
      {[...leftArc, ...rightArc].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.062, 8, 8]} />
          <meshLambertMaterial color={DARK} />
        </mesh>
      ))}
      {/* O mouth */}
      <mesh position={[0, -0.18, 0.91]}>
        <torusGeometry args={[0.1, 0.025, 8, 20]} />
        <meshLambertMaterial color="#475569" />
      </mesh>
      {/* Blush */}
      <mesh position={[-0.54, -0.05, 0.84]} scale={[1, 0.55, 0.7]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={PINK} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.54, -0.05, 0.84]} scale={[1, 0.55, 0.7]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={PINK} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ── Standard arms ────────────────────────────────────────────────────────────
function Arms({ leftRaise = false }: { leftRaise?: boolean }) {
  return (
    <group>
      {/* Left arm */}
      <mesh
        position={leftRaise ? [-1.1, 0.6, 0.3] : [-1.42, -0.22, 0.2]}
        rotation={
          leftRaise
            ? [0, 0.3, Math.PI * 0.85]
            : [0.15, 0, Math.PI * 0.62]
        }
      >
        <cylinderGeometry args={[0.1, 0.1, 0.72, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      <mesh position={leftRaise ? [-1.5, 1.1, 0.35] : [-1.77, -0.48, 0.28]}>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      {/* Right arm */}
      <mesh position={[1.42, -0.22, 0.2]} rotation={[0.15, 0, -Math.PI * 0.62]}>
        <cylinderGeometry args={[0.1, 0.1, 0.72, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      <mesh position={[1.77, -0.48, 0.28]}>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
    </group>
  );
}

// ── Standard legs ────────────────────────────────────────────────────────────
function Legs() {
  return (
    <group>
      {/* Left */}
      <mesh position={[-0.36, -1.35, 0]} rotation={[0.12, 0, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.76, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      <mesh position={[-0.43, -1.79, 0.1]} scale={[1, 0.42, 1.3]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      {/* Right */}
      <mesh position={[0.36, -1.35, 0]} rotation={[-0.12, 0, -0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.76, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
      <mesh position={[0.43, -1.79, -0.1]} scale={[1, 0.42, 1.3]}>
        <sphereGeometry args={[0.19, 10, 10]} />
        <meshLambertMaterial color={ARM} />
      </mesh>
    </group>
  );
}

// ── Laptop prop ───────────────────────────────────────────────────────────────
function Laptop() {
  return (
    <group position={[0, -0.76, 1.1]} rotation={[-0.18, 0, 0]}>
      {/* Lid */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.44, 1.04, 0.07]} />
        <meshLambertMaterial color={NAVY} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.52, 0.042]}>
        <boxGeometry args={[1.24, 0.84, 0.02]} />
        <meshLambertMaterial color={SCREEN} emissive={new THREE.Color(SCREEN)} emissiveIntensity={0.28} />
      </mesh>
      {/* Code-line glows */}
      {([
        [BLUE2, [-0.22, 0.72, 0.055], [0.52, 0.05, 0.01]],
        ["#34d399", [0.06, 0.60, 0.055], [0.72, 0.05, 0.01]],
        ["#c084fc", [-0.08, 0.48, 0.055], [0.38, 0.05, 0.01]],
        [BLUE2, [-0.15, 0.36, 0.055], [0.55, 0.05, 0.01]],
        [GOLD, [0.02, 0.24, 0.055], [0.42, 0.05, 0.01]],
      ] as [string, [number, number, number], [number, number, number]][]).map(
        ([col, pos, sz], i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={sz} />
            <meshLambertMaterial
              color={col}
              emissive={new THREE.Color(col)}
              emissiveIntensity={0.6}
            />
          </mesh>
        )
      )}
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.44, 0.08, 0.92]} />
        <meshLambertMaterial color={NAVY} />
      </mesh>
    </group>
  );
}

// ── CLOUD 1 : CODER ──────────────────────────────────────────────────────────
function CoderCloud() {
  const grp = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Subtle typing bob
    grp.current.rotation.z = Math.sin(t * 4.2) * 0.022;
    grp.current.rotation.x = Math.sin(t * 1.4) * 0.015;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.38} floatIntensity={0.9} floatingRange={[-0.18, 0.18]}>
      <group ref={grp}>
        <CloudBody />
        <FaceCoder />
        {/* Arms forward-down holding laptop */}
        <mesh position={[-1.25, -0.38, 0.62]} rotation={[0.35, 0.3, Math.PI * 0.58]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        <mesh position={[1.25, -0.38, 0.62]} rotation={[0.35, -0.3, -Math.PI * 0.58]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        <Legs />
        <Laptop />
      </group>
    </Float>
  );
}

// ── CLOUD 2 : HAPPY / PLAYING ────────────────────────────────────────────────
function HappyCloud() {
  const grp = useRef<THREE.Group>(null!);
  const armL = useRef<THREE.Group>(null!);
  const legR = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Waving arm
    if (armL.current) armL.current.rotation.z = Math.sin(t * 2.8) * 0.52 + 0.2;
    // Kicking leg
    if (legR.current) legR.current.rotation.x = Math.sin(t * 2.2) * 0.42;
    // Gentle whole-body sway
    grp.current.rotation.z = Math.sin(t * 1.1) * 0.06;
  });

  return (
    <Float speed={1.9} rotationIntensity={0.52} floatIntensity={1.2} floatingRange={[-0.28, 0.28]}>
      <group ref={grp}>
        <CloudBody />
        <FaceHappy />
        {/* Left arm raised — animated */}
        <group ref={armL} position={[-0.82, 0.35, 0]}>
          <mesh position={[-0.38, 0.34, 0.18]} rotation={[0, 0, Math.PI * 0.78]}>
            <cylinderGeometry args={[0.1, 0.1, 0.74, 10]} />
            <meshLambertMaterial color={ARM} />
          </mesh>
          <mesh position={[-0.8, 0.6, 0.18]}>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshLambertMaterial color={ARM} />
          </mesh>
        </group>
        {/* Right arm casual */}
        <mesh position={[1.42, -0.22, 0.2]} rotation={[0.15, 0, -Math.PI * 0.62]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        <mesh position={[1.77, -0.48, 0.28]}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        {/* Left leg static */}
        <mesh position={[-0.36, -1.35, 0]} rotation={[0.12, 0, 0.1]}>
          <cylinderGeometry args={[0.1, 0.1, 0.76, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        <mesh position={[-0.43, -1.79, 0.1]} scale={[1, 0.42, 1.3]}>
          <sphereGeometry args={[0.19, 10, 10]} />
          <meshLambertMaterial color={ARM} />
        </mesh>
        {/* Right leg kicking — animated */}
        <group ref={legR} position={[0.36, -0.88, 0]}>
          <mesh position={[0, -0.48, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.76, 10]} />
            <meshLambertMaterial color={ARM} />
          </mesh>
          <mesh position={[0.07, -0.92, -0.1]} scale={[1, 0.42, 1.3]}>
            <sphereGeometry args={[0.19, 10, 10]} />
            <meshLambertMaterial color={ARM} />
          </mesh>
        </group>
        {/* Spinning star */}
        <SpinningStar />
      </group>
    </Float>
  );
}

function SpinningStar() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 2.2;
    ref.current.rotation.z = clock.elapsedTime * 1.4;
  });
  return (
    <mesh ref={ref} position={[1.22, 1.42, 0.3]}>
      <octahedronGeometry args={[0.28, 0]} />
      <meshLambertMaterial color={GOLD} emissive={new THREE.Color(GOLD)} emissiveIntensity={0.45} />
    </mesh>
  );
}

// ── CLOUD 3 : SLEEPING ───────────────────────────────────────────────────────
function SleepingCloud() {
  const z1 = useRef<THREE.Group>(null!);
  const z2 = useRef<THREE.Group>(null!);
  const z3 = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const rise = (phase: number) => {
      const p = ((Math.sin(t * 0.85 + phase) + 1) / 2);
      return { y: p * 0.8, x: p * 0.25, s: 0.7 + p * 0.5, a: p < 0.15 ? p / 0.15 : p > 0.85 ? (1 - p) / 0.15 : 1 };
    };
    const r1 = rise(0);    z1.current.position.set(1.05 + r1.x, 1.2 + r1.y, 0.5);    z1.current.scale.setScalar(r1.s);
    const r2 = rise(1.3);  z2.current.position.set(1.22 + r2.x, 1.6 + r2.y, 0.5);   z2.current.scale.setScalar(r2.s * 1.3);
    const r3 = rise(2.6);  z3.current.position.set(1.38 + r3.x, 2.05 + r3.y, 0.5);  z3.current.scale.setScalar(r3.s * 1.6);
  });

  const ZShape = ({ color }: { color: string }) => (
    <group>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.24, 0.04, 0.04]} />
        <meshLambertMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI * 0.56]}>
        <boxGeometry args={[0.21, 0.04, 0.04]} />
        <meshLambertMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[0.24, 0.04, 0.04]} />
        <meshLambertMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );

  return (
    <Float speed={0.65} rotationIntensity={0.22} floatIntensity={0.55} floatingRange={[-0.14, 0.14]}>
      <group>
        <CloudBody />
        <FaceSleeping />
        <Arms />
        <Legs />
        {/* Rising ZZZ */}
        <group ref={z1}><ZShape color={BLUE1} /></group>
        <group ref={z2}><ZShape color={BLUE2} /></group>
        <group ref={z3}><ZShape color={BLUE3} /></group>
      </group>
    </Float>
  );
}

// ── Camera rig — mouse parallax ──────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.8 - camera.position.x) * 0.035;
    camera.position.y += (-mouse.current.y * 1.2 - camera.position.y) * 0.035;
    camera.lookAt(0.5, -0.2, 0);
  });

  return null;
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function CloudFallback() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", opacity: 0.6 }}>
      {["☁️", "☁️", "☁️"].map((e, i) => (
        <span key={i} style={{ fontSize: "4rem", animation: `float ${2 + i * 0.4}s ease-in-out infinite alternate`, animationDelay: `${i * 0.3}s` }}>{e}</span>
      ))}
    </div>
  );
}

// ── Main scene export ─────────────────────────────────────────────────────────
export default function CloudScene3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (webglSupported === null) return null;
  if (!webglSupported) return <CloudFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0.5, 12], fov: 44 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 10, 6]} intensity={1.3} color="#ffffff" castShadow />
      <directionalLight position={[-4, -2, 4]} intensity={0.45} color="#dbeafe" />
      <hemisphereLight args={["#dbeafe", "#1e3a8a", 0.5]} />

      <CameraRig />

      {/* Coder — upper right, closest */}
      <group position={[2.4, 1.6, 0]} scale={0.88}>
        <CoderCloud />
      </group>

      {/* Happy — lower left, mid depth */}
      <group position={[-2.0, -1.4, -1.5]} scale={0.8}>
        <HappyCloud />
      </group>

      {/* Sleeping — lower right, slightly back */}
      <group position={[2.2, -2.4, -1.0]} scale={0.74}>
        <SleepingCloud />
      </group>
    </Canvas>
  );
}
