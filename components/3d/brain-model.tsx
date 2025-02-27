import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function BrainModel(props: any) {
  const group = useRef<THREE.Group>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isVerySmall = useMediaQuery("(max-width: 480px)")
  
  // Adjust scale for different screen sizes
  const modelScale = useMemo(() => {
    if (isVerySmall) return 0.75
    if (isMobile) return 0.85
    return 1
  }, [isMobile, isVerySmall])
  
  // Create a tech-inspired brain using primitives
  const brainGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
  const brainMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  }), [])

  // Create floating particles around the brain - reduce on mobile
  const particleCount = isMobile ? 400 : 1000
  const particleArea = isMobile ? 3.5 : 4
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * particleArea
      positions[i3 + 1] = (Math.random() - 0.5) * particleArea
      positions[i3 + 2] = (Math.random() - 0.5) * particleArea
    }
    return positions
  }, [particleCount, particleArea])
  
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [positions])
  
  const particleMaterial = useMemo(() => new THREE.PointsMaterial({
    color: 0xffffff,
    size: isMobile ? 0.03 : 0.02,
    sizeAttenuation: true
  }), [isMobile])

  useFrame(({ clock }) => {
    if (group.current) {
      // Slower rotation on mobile for better performance
      group.current.rotation.y = clock.getElapsedTime() * (isMobile ? 0.05 : 0.1)
    }
  })

  return (
    <group ref={group} {...props} dispose={null} scale={[modelScale, modelScale, modelScale]}>
      <mesh geometry={brainGeometry} material={brainMaterial} />
      <points geometry={particleGeometry} material={particleMaterial} />
    </group>
  )
} 