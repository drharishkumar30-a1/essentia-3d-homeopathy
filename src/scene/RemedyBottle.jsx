import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { sceneState } from './sceneState.js'

// Classic round apothecary vial: flat base, cylindrical body, shoulder
// curve into a short neck with a lip, wrapped paper label, natural cork.
// The cork pops off (sceneState.cork.open) when the globules scatter.
//
// Lathe profile: x = radius, y = height. Body ≈ 2.15 tall + cork.
const PROFILE = [
  [0.0, -1.0],
  [0.32, -1.0], // flat base
  [0.37, -0.96],
  [0.38, -0.85],
  [0.38, 0.55], // straight wall
  [0.34, 0.73], // shoulder
  [0.22, 0.86],
  [0.17, 0.93],
  [0.16, 1.06], // neck
  [0.2, 1.09], // lip
  [0.2, 1.15],
  [0.14, 1.15],
]

function GlassMaterial({ quality }) {
  return quality === 'high' ? (
    <MeshTransmissionMaterial
      samples={6}
      resolution={512}
      transmission={1}
      thickness={0.3}
      roughness={0.04}
      chromaticAberration={0.02}
      anisotropicBlur={0.3}
      distortion={0.08}
      distortionScale={0.2}
      clearcoat={1}
      clearcoatRoughness={0.06}
      ior={1.5}
      color="#ffffff"
      background={new THREE.Color('#f7f3ea')}
    />
  ) : (
    <meshPhysicalMaterial
      transparent
      opacity={0.42}
      depthWrite={false}
      roughness={0.06}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={1.6}
      color="#fbf8f0"
    />
  )
}

export default function RemedyBottle({ quality }) {
  const corkRef = useRef()
  const openRef = useRef(0)

  const latheGeometry = useMemo(() => {
    const points = PROFILE.map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(points, 48)
  }, [])

  useFrame((_, delta) => {
    openRef.current = THREE.MathUtils.damp(
      openRef.current,
      sceneState.cork.open,
      4,
      delta,
    )
    const o = openRef.current
    const cork = corkRef.current
    if (!cork) return
    // lift out of the neck, drift aside, and tip over like a popped cork
    cork.position.y = 1.22 + o * 1.05
    cork.position.x = o * 0.6
    cork.rotation.z = -o * 1.2
    cork.rotation.x = o * 0.35
  })

  return (
    <group>
      {/* Round glass vial — renders after the pellets and never writes
          depth, so everything inside stays visible through it */}
      <mesh geometry={latheGeometry} renderOrder={2}>
        <GlassMaterial quality={quality} />
      </mesh>

      {/* Paper label wrapped around the glass, like the reference bottles */}
      <mesh position={[0, -0.3, 0]} rotation={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.387, 0.387, 0.66, 32, 1, true, 0, 1.24]} />
        <meshStandardMaterial color="#c8d4c4" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.3, 0]} rotation={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.58, 32, 1, true, 0, 1.1]} />
        <meshStandardMaterial color="#f3ead9" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Cork stopper — animated group; meshes sit relative to its base */}
      <group ref={corkRef} position={[0, 1.22, 0]}>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.19, 0.14, 0.3, 32]} />
          <meshStandardMaterial color="#b9854e" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.18, 0]} scale={[1, 0.45, 1]}>
          <sphereGeometry args={[0.19, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c69158" roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}
