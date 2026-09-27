import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function CrystalCore() {
  const mesh = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.25
      mesh.current.rotation.x = Math.sin(t * 0.3) * 0.3
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.15
      wire.current.rotation.z = t * 0.1
    }
  })
  return (
    <group>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#0b1020"
            metalness={0.9}
            roughness={0.15}
            clearcoat={1}
            emissive="#123"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh ref={wire} scale={1.28}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#38e1ff" wireframe transparent opacity={0.35} />
        </mesh>
        {/* orbiting rings */}
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 120]} />
          <meshBasicMaterial color="#f5b942" transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[2.5, 0.012, 16, 120]} />
          <meshBasicMaterial color="#7c5cff" transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  )
}

function ParticleRing({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 2.8 + Math.random() * 1.6
      arr[i * 3] = Math.cos(angle) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.4
      arr[i * 3 + 2] = Math.sin(angle) * r
    }
    return arr
  }, [count])
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f5b942" transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0" data-testid="hero-3d" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#38e1ff" />
        <pointLight position={[-5, -2, 3]} intensity={1.2} color="#f5b942" />
        <pointLight position={[0, 3, -4]} intensity={0.8} color="#7c5cff" />
        <Stars radius={60} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} />
        <CrystalCore />
        <ParticleRing count={180} />
        <ContactShadows position={[0, -2.4, 0]} opacity={0.55} scale={12} blur={2.4} far={4} color="#000" />
      </Canvas>
    </div>
  )
}
