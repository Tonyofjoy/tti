"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { Group, MeshStandardMaterial, CylinderGeometry, BoxGeometry, TorusGeometry, Mesh, MathUtils } from "three"
import type * as THREE from "three"

export default function SpaceshipModel() {
  const groupRef = useRef<THREE.Group>(null)
  const hoverRef = useRef<THREE.Group>(null)

  // Create a more complex spaceship shape based on your logo
  const createSpaceshipGeometry = () => {
    const group = new Group()

    // Main body - elongated hexagon
    const bodyGeometry = new CylinderGeometry(0.5, 0.5, 2, 6)
    const bodyMaterial = new MeshStandardMaterial({
      color: "#00b8ff",
      metalness: 0.7,
      roughness: 0.2,
    })
    const body = new Mesh(bodyGeometry, bodyMaterial)
    body.rotation.x = Math.PI / 2
    group.add(body)

    // Wings
    const wingGeometry = new BoxGeometry(2, 0.1, 1)
    const wingMaterial = new MeshStandardMaterial({
      color: "#0021a7",
      metalness: 0.8,
      roughness: 0.2,
    })
    const leftWing = new Mesh(wingGeometry, wingMaterial)
    leftWing.position.set(-0.8, 0, 0)
    leftWing.rotation.z = Math.PI / 6
    group.add(leftWing)

    const rightWing = new Mesh(wingGeometry, wingMaterial)
    rightWing.position.set(0.8, 0, 0)
    rightWing.rotation.z = -Math.PI / 6
    group.add(rightWing)

    // Engine glow
    const glowGeometry = new TorusGeometry(0.2, 0.05, 16, 32)
    const glowMaterial = new MeshStandardMaterial({
      color: "#00b8ff",
      emissive: "#00b8ff",
      emissiveIntensity: 2,
    })
    const glow = new Mesh(glowGeometry, glowMaterial)
    glow.position.set(0, 0, 1)
    group.add(glow)

    return group
  }

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2

    // Add slight tilt based on mouse position
    if (hoverRef.current) {
      const mouseX = (state.mouse.x * Math.PI) / 10
      const mouseY = (state.mouse.y * Math.PI) / 10

      hoverRef.current.rotation.x = MathUtils.lerp(hoverRef.current.rotation.x, mouseY, 0.1)
      hoverRef.current.rotation.z = MathUtils.lerp(hoverRef.current.rotation.z, -mouseX, 0.1)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={hoverRef}>
          <primitive ref={groupRef} object={createSpaceshipGeometry()} scale={[0.8, 0.8, 0.8]} />
        </group>
      </Float>
    </>
  )
}

