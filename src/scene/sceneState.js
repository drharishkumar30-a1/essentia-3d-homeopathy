import * as THREE from 'three'

// Mutable bridge between GSAP (writes via scrubbed timelines) and R3F
// (reads every frame in useFrame). Plain numbers only — no React state,
// so scrolling never triggers a re-render.
export const sceneState = {
  group: { x: 1.2, y: 0, rotY: 0.4, rotZ: 0, scale: 1 },
  camera: { z: 6 },
  pellets: { spread: 0 }, // 0 = inside bottle, 1 = scattered constellation
  cork: { open: 0 }, // 0 = sealed, 1 = popped off (lifts + tips aside)
  // accent tint applied softly to the pellets (white = neutral)
  liquid: { color: new THREE.Color('#f5f0e4') },
}

export const HERO_POSE = {
  group: { x: 1.2, y: 0, rotY: 0.4, rotZ: 0, scale: 1 },
  camera: { z: 6 },
  pellets: { spread: 0 },
}
