"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

interface WebExperienceProps {
  position?: [number, number, number]
}

function WebDisplayModel({ position = [0, 0.2, 0] }: WebExperienceProps) {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()
      group.current.rotation.y = Math.sin(t / 4) / 8
      group.current.position.y = Math.sin(t / 1.5) / 20
    }
  })

  return (
    <group ref={group} position={position}>
      {/* Screen */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen Display with glow */}
      <mesh position={[0, 0.3, 0.06]}>
        <planeGeometry args={[1.9, 1.1]} />
        <meshBasicMaterial color="#0059ff" toneMapped={false} />
      </mesh>
      
      {/* Stand */}
      <mesh castShadow receiveShadow position={[0, -0.45, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, -0.85, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.4]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Floating elements - simplified without text */}
      <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5} position={[1.2, 0.5, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#5eddff" emissive="#5eddff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={4} rotationIntensity={0.4} floatIntensity={0.4} position={[-1.2, 0.6, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={6} rotationIntensity={0.3} floatIntensity={0.6} position={[-0.8, -0.4, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3} position={[0.8, -0.3, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      {/* Add sparkles for visual enhancement */}
      <Sparkles count={30} scale={5} size={0.6} speed={0.3} color="#61dafb" />
    </group>
  )
}

export default function WebExperience() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <WebDisplayModel />
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={2} 
      />
    </Canvas>
  )
} 