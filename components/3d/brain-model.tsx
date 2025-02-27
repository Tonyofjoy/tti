import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function BrainModel(props: any) {
  const group = useRef<THREE.Group>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isVerySmall = useMediaQuery("(max-width: 480px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const isSmallLaptop = useMediaQuery("(max-width: 1280px)")
  
  // Adjust scale for different screen sizes - increased for mobile views
  const modelScale = useMemo(() => {
    if (isVerySmall) return 0.85  // Increased from 0.55
    if (isMobile) return 0.95     // Increased from 0.65
    if (isTablet) return 0.85
    if (isSmallLaptop) return 0.9
    return 0.95
  }, [isMobile, isVerySmall, isTablet, isSmallLaptop])
  
  // Position adjustments for different screen sizes
  // Adjusted Y position to accommodate larger model size on mobile
  const modelPosition = useMemo(() => {
    if (isVerySmall) return [0, -0.5, 0]  // Adjusted for larger size
    if (isMobile) return [0, -0.4, 0]     // Adjusted for larger size
    if (isTablet) return [0, -0.1, 0]
    return [0, 0, 0]
  }, [isMobile, isVerySmall, isTablet])
  
  // Create a tech-inspired brain using primitives
  const brainGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
  const brainMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.7 : 0.8
  }), [isMobile])

  // Create floating particles around the brain - adjusted for better visibility on mobile
  const particleCount = isVerySmall ? 250 : isMobile ? 350 : isTablet ? 500 : 900
  const particleArea = isVerySmall ? 2.8 : isMobile ? 3.2 : isTablet ? 3.4 : 4
  
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
    size: isVerySmall ? 0.045 : isMobile ? 0.04 : 0.02,  // Increased particle size on mobile
    sizeAttenuation: true,
    transparent: true,
    opacity: isMobile ? 0.75 : isTablet ? 0.75 : 0.9     // Increased opacity on mobile
  }), [isMobile, isVerySmall, isTablet])

  useFrame(({ clock }) => {
    if (group.current) {
      // Slower rotation on mobile for better performance
      const rotationSpeed = isVerySmall ? 0.025 : isMobile ? 0.035 : isTablet ? 0.06 : 0.08
      group.current.rotation.y = clock.getElapsedTime() * rotationSpeed
    }
  })

  return (
    <group ref={group} {...props} dispose={null} 
          scale={[modelScale, modelScale, modelScale]} 
          position={modelPosition}>
      <mesh geometry={brainGeometry} material={brainMaterial} />
      <points geometry={particleGeometry} material={particleMaterial} />
    </group>
  )
} 