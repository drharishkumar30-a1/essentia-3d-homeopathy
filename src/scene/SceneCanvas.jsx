import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { useDeviceProfile } from '../hooks/useDeviceProfile.js'

// Fixed, non-interactive canvas that sits behind the scrolling DOM.
export default function SceneCanvas() {
  const { quality, dprMax } = useDeviceProfile()

  return (
    <div className="canvas-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, dprMax]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Experience quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  )
}
