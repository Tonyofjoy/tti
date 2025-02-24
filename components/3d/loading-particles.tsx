"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface LoadingParticlesProps {
  progress: number
}

export default function LoadingParticles({ progress }: LoadingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  // Create particles positions
  const particles = useMemo(() => {
    const temp = []
    const helixCount = 2
    const pointsPerHelix = 500
    const helixRadius = 1.5
    const helixHeight = 4
    const turns = 3

    // Create double helix
    for (let helix = 0; helix < helixCount; helix++) {
      for (let i = 0; i < pointsPerHelix; i++) {
        const angle = (i / pointsPerHelix) * Math.PI * 2 * turns
        const heightProgress = (i / pointsPerHelix) * helixHeight - helixHeight / 2
        const helixOffset = helix * Math.PI
        const x = Math.cos(angle + helixOffset) * helixRadius
        const y = heightProgress
        const z = Math.sin(angle + helixOffset) * helixRadius
        temp.push(x, y, z)
      }
    }

    // Add random particles
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * helixRadius * 2
      const height = (Math.random() - 0.5) * helixHeight
      temp.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    }

    return new Float32Array(temp)
  }, [])

  // Create particles colors
  const colors = useMemo(() => {
    const temp = []
    const color1 = new THREE.Color("#00b8ff")
    const color2 = new THREE.Color("#0021a7")
    const totalPoints = particles.length / 3

    for (let i = 0; i < totalPoints; i++) {
      const mixRatio = i / totalPoints
      const color = new THREE.Color().lerpColors(color1, color2, mixRatio)
      temp.push(color.r, color.g, color.b)
    }

    return new Float32Array(temp)
  }, [particles])

  // Animation
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    // Animate particles
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      const angle = time + (x + z) * 0.5
      const wave = Math.sin(angle) * 0.15

      positions[i] = x + wave * (progress / 100)
      positions[i + 2] = z + wave * (progress / 100)
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.1

    // Animate particle size
    if (materialRef.current) {
      materialRef.current.size = THREE.MathUtils.lerp(0.015, 0.03, Math.sin(time * 2) * 0.5 + 0.5)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

