import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import BottleRig from './BottleRig.jsx'

// Studio lighting rig, all code-only (no HDR fetch). The tall vertical
// Lightformer strips are what draw the long specular streaks down the
// glass — the signature of premium bottle photography.
export default function Experience({ quality }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} color="#fff8ec" />
      <spotLight
        position={[-5, 4, 4]}
        angle={0.45}
        penumbra={1}
        intensity={28}
        color="#f0e6d0"
      />

      <Environment resolution={quality === 'high' ? 512 : 256} frames={1}>
        {/* big soft ceiling */}
        <Lightformer
          intensity={1.8}
          position={[0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
        />
        {/* tall strips left + right → long streak reflections on the glass */}
        <Lightformer
          intensity={3}
          position={[-4, 0.5, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.7, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={2.2}
          position={[4, 1, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.5, 6, 1]}
          color="#fff2dc"
        />
        {/* warm low bounce, like light off a wooden counter */}
        <Lightformer
          intensity={0.7}
          position={[0, -3, 3]}
          scale={[8, 2, 1]}
          color="#e8d9bd"
        />
        {/* soft sage backdrop tint */}
        <Lightformer
          intensity={0.7}
          position={[0, 1, -4]}
          scale={[6, 4, 1]}
          color="#c8d4c4"
        />
      </Environment>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.4}
        scale={8}
        blur={2.6}
        far={2.4}
        resolution={256}
        color="#2f4538"
      />

      <BottleRig quality={quality} />
    </>
  )
}
