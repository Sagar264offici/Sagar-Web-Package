import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export const REACT_CYAN = '#61DAFB'
const ORBIT_RADIUS = 2.2

type OrbitProps = {
  /** rotation of this ellipse within the logo plane (0°, 60°, 120° — like the real React mark) */
  tilt: number
  speed: number
  offset: number
}

function ElectronOrbit({ tilt, speed, offset }: OrbitProps) {
  const electron = useRef<THREE.Mesh>(null)
  const angle = useRef(offset)

  useFrame((_, delta) => {
    angle.current += delta * speed
    if (electron.current) {
      electron.current.position.set(
        Math.cos(angle.current) * ORBIT_RADIUS,
        Math.sin(angle.current) * ORBIT_RADIUS,
        0,
      )
    }
  })

  return (
    <group rotation={[0, 0, tilt]}>
      {/* orbit path — one ellipse of the React mark */}
      <mesh>
        <torusGeometry args={[ORBIT_RADIUS, 0.028, 16, 160]} />
        <meshBasicMaterial color={REACT_CYAN} transparent opacity={0.95} />
      </mesh>
      {/* electron riding the orbit, with an additive glow halo */}
      <mesh ref={electron}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
        <mesh scale={2.4}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial
            color={REACT_CYAN}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </mesh>
    </group>
  )
}

/** Nucleus (proton core) of the atom. */
function Nucleus() {
  const core = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (core.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06
      core.current.scale.setScalar(s)
    }
  })
  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#062a33" emissive={REACT_CYAN} emissiveIntensity={2.4} roughness={0.3} />
      </mesh>
      {/* soft aura around the core */}
      <mesh scale={2.6}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial
          color={REACT_CYAN}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/** Full React logo: nucleus + 3 elliptical orbits + 3 electrons, slowly spinning. */
function ReactAtom() {
  const spin = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * 0.35
      spin.current.rotation.x = 0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
      <group ref={spin} rotation={[0.5, 0, -0.12]}>
        <ElectronOrbit tilt={0} speed={1.25} offset={0} />
        <ElectronOrbit tilt={Math.PI / 3} speed={1.05} offset={2.1} />
        <ElectronOrbit tilt={(2 * Math.PI) / 3} speed={1.45} offset={4.2} />
        <Nucleus />
      </group>
    </Float>
  )
}

function ParticleRing({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 3.1 + Math.random() * 1.6
      arr[i * 3] = Math.cos(angle) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.6
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
        camera={{ position: [0, 0.6, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.6} color={REACT_CYAN} />
        <pointLight position={[-5, -2, 3]} intensity={1.1} color="#f5b942" />
        <pointLight position={[0, 3, -4]} intensity={0.8} color="#7c5cff" />
        <Stars radius={60} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} />
        <ReactAtom />
        <ParticleRing />
        <ContactShadows position={[0, -2.8, 0]} opacity={0.5} scale={12} blur={2.4} far={4} color="#000" />
      </Canvas>
    </div>
  )
}
