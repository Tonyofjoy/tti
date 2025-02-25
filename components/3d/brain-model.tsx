import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function BrainModel(props: any) {
  const group = useRef<THREE.Group>(null)

  // Create a tech-inspired brain using primitives
  const brainGeometry = new THREE.SphereGeometry(1, 32, 32)
  const brainMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  })

  // Create floating particles around the brain
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 4
    positions[i3 + 1] = (Math.random() - 0.5) * 4
    positions[i3 + 2] = (Math.random() - 0.5) * 4
  }
  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    sizeAttenuation: true
  })

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={brainGeometry} material={brainMaterial} />
      <points geometry={particleGeometry} material={particleMaterial} />
    </group>
  )
} 