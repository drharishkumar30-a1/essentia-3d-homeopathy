import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { sceneState } from './sceneState.js'

const COUNT = 110
const EXIT_PHASE = 0.38 // first part of each pellet's journey: rise to the mouth
const dummy = new THREE.Object3D()
const pos = new THREE.Vector3()
const WHITE = new THREE.Color('#f5f0e4')
const tintTarget = new THREE.Color()

// White homeopathic pillules filling the round vial about two-thirds.
// On scatter they STREAM OUT THROUGH THE MOUTH — each pellet first rises
// to the neck opening, then flies to its constellation spot. Top pellets
// leave first; everything reverses cleanly when scrolling back.
export default function Pellets() {
  const meshRef = useRef()
  const matRef = useRef()
  const spreadRef = useRef(0)

  const targets = useMemo(() => {
    const rng = mulberry32(42)
    return Array.from({ length: COUNT }, (_, i) => {
      const angle = rng() * Math.PI * 2
      const radius = Math.sqrt(rng()) * 0.28
      return {
        inside: new THREE.Vector3(
          Math.cos(angle) * radius,
          -0.86 + (i / COUNT) * 0.92 + (rng() - 0.5) * 0.05,
          Math.sin(angle) * radius,
        ),
        // the neck opening, with a little jitter so they don't single-file
        mouth: new THREE.Vector3(
          (rng() - 0.5) * 0.12,
          1.28 + rng() * 0.15,
          (rng() - 0.5) * 0.12,
        ),
        out: new THREE.Vector3(
          (rng() - 0.5) * 10,
          (rng() - 0.38) * 7, // biased upward — they escaped through the mouth
          (rng() - 0.5) * 3,
        ),
        // higher pellets (larger i) start their exit sooner
        delay: (1 - i / COUNT) * 0.35,
        scale: 0.85 + rng() * 0.3,
      }
    })
  }, [])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    spreadRef.current = THREE.MathUtils.damp(
      spreadRef.current,
      sceneState.pellets.spread,
      4,
      delta,
    )
    const t = spreadRef.current
    for (let i = 0; i < COUNT; i++) {
      const { inside, mouth, out, delay, scale } = targets[i]
      // per-pellet staggered progress along inside → mouth → out
      const p = THREE.MathUtils.clamp((t - delay) / (1 - delay), 0, 1)
      if (p <= 0) {
        pos.copy(inside)
      } else if (p < EXIT_PHASE) {
        pos.lerpVectors(inside, mouth, p / EXIT_PHASE)
      } else {
        pos.lerpVectors(mouth, out, (p - EXIT_PHASE) / (1 - EXIT_PHASE))
      }
      dummy.position.copy(pos)
      dummy.scale.setScalar(0.052 * scale * (1 + p * 0.5))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true

    // soft per-product tint: mostly white, pushed toward the accent
    if (matRef.current) {
      tintTarget.copy(WHITE).lerp(sceneState.liquid.color, 0.45)
      matRef.current.color.lerp(tintTarget, 1 - Math.exp(-5 * delta))
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial ref={matRef} color="#f5f0e4" roughness={0.4} />
    </instancedMesh>
  )
}

// Deterministic PRNG so pellet layout is stable across renders
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
