import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/** Campo de partículas que deriva lentamente y reacciona al mouse. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60 // x
      arr[i * 3 + 1] = Math.random() * 25 // y (sobre el horizonte)
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60 // z
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.02
    ref.current.position.y = Math.sin(t * 0.2) * 0.4
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00fff2"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Suelo de grilla wireframe estilo "horizonte cyberpunk" que avanza hacia la cámara. */
function GridFloor() {
  const a = useRef<THREE.GridHelper>(null)
  const b = useRef<THREE.GridHelper>(null)
  const SIZE = 60
  const DIV = 30
  const SPEED = 6

  useFrame((_, delta) => {
    for (const g of [a.current, b.current]) {
      if (!g) continue
      g.position.z += SPEED * delta
      if (g.position.z >= SIZE) g.position.z -= SIZE * 2
    }
  })

  return (
    <group position={[0, -6, 0]}>
      <gridHelper
        ref={a}
        args={[SIZE * 2, DIV * 2, '#ff00e6', '#00fff2']}
        position={[0, 0, 0]}
      />
      <gridHelper
        ref={b}
        args={[SIZE * 2, DIV * 2, '#ff00e6', '#00fff2']}
        position={[0, 0, -SIZE]}
      />
    </group>
  )
}

/** Parallax sutil de la cámara siguiendo el puntero. */
function Rig() {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    target.current.x = state.pointer.x * 1.6
    target.current.y = 2.5 + state.pointer.y * 0.8
    camera.position.x += (target.current.x - camera.position.x) * 0.04
    camera.position.y += (target.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, -10)
  })

  return null
}

interface HeroSceneProps {
  /** Reduce densidad en equipos modestos / pantallas pequeñas. */
  lowPower?: boolean
}

export function HeroScene({ lowPower = false }: HeroSceneProps) {
  const particleCount = lowPower ? 250 : 800

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={lowPower ? 1 : [1, 1.6]}
      camera={{ position: [0, 2.5, 14], fov: 70 }}
      gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 18, 45]} />
      <Particles count={particleCount} />
      <GridFloor />
      <Rig />
    </Canvas>
  )
}
