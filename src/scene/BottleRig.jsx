import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { sceneState } from './sceneState.js'
import RemedyBottle from './RemedyBottle.jsx'
import Pellets from './Pellets.jsx'

const damp = THREE.MathUtils.damp

// Reads sceneState (written by GSAP scroll timelines) every frame and
// applies it to the scene graph with frame-rate-independent damping,
// so fast flick-scrolls still glide.
export default function BottleRig({ quality }) {
  const groupRef = useRef()
  const idleRef = useRef()

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const s = sceneState

    group.position.x = damp(group.position.x, s.group.x, 5, delta)
    group.position.y = damp(group.position.y, s.group.y, 5, delta)
    group.rotation.y = damp(group.rotation.y, s.group.rotY, 5, delta)
    group.rotation.z = damp(group.rotation.z, s.group.rotZ, 5, delta)

    const scale = damp(group.scale.x, s.group.scale, 5, delta)
    group.scale.setScalar(scale)

    // Gentle perpetual idle motion layered on top of the scroll pose,
    // plus a subtle lean toward the mouse position
    if (idleRef.current) {
      const idle = idleRef.current
      idle.rotation.y = state.clock.elapsedTime * 0.1
      idle.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
      idle.rotation.x = damp(idle.rotation.x, -state.pointer.y * 0.07, 3, delta)
      idle.rotation.z = damp(idle.rotation.z, -state.pointer.x * 0.05, 3, delta)
      idle.position.x = damp(idle.position.x, state.pointer.x * 0.05, 3, delta)
    }

    state.camera.position.z = damp(state.camera.position.z, s.camera.z, 5, delta)
  })

  return (
    <group ref={groupRef} position={[1.2, 0, 0]} rotation={[0, 0.4, 0]}>
      <group ref={idleRef}>
        <RemedyBottle quality={quality} />
        <Pellets />
        {/* faint golden motes drifting around the vial */}
        <Sparkles
          count={26}
          scale={[2.6, 3.2, 1.6]}
          size={2.2}
          speed={0.25}
          opacity={0.4}
          color="#c98a3d"
        />
      </group>
    </group>
  )
}
