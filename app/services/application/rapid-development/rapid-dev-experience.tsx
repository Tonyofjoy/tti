"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { Euler } from "three"

// Simple cube that changes color over time
function AnimatedCube({ position, size, rotationSpeed = 0.01 }: { position: [number, number, number], size: number, rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [color, setColor] = useState(0x4f46e5) // Indigo

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed
      meshRef.current.rotation.y += delta * rotationSpeed * 1.5
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle between different blue/cyan shades
      setColor(current => {
        const colors = [0x4f46e5, 0x3b82f6, 0x06b6d4, 0x0891b2]
        const currentIndex = colors.indexOf(current)
        return colors[(currentIndex + 1) % colors.length]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? size * 1.1 : size}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={`#${color.toString(16)}`} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

// Floating code blocks to represent rapid development
function CodeBlock({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={new Euler(...rotation)} scale={scale}>
      <mesh>
        <boxGeometry args={[2, 0.2, 1.3]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Code lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.11, 0.4 - i * 0.2]}>
          <boxGeometry args={[1.5, 0.03, 0.05]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#60a5fa" : "#a5b4fc"} emissive={i % 2 === 0 ? "#60a5fa" : "#a5b4fc"} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// Floating gear to represent development processes
function DevGear({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the gear
      meshRef.current.rotation.z -= 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={new Euler(...rotation)} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.2, 16]} />
      <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.2} />
      {/* Gear teeth */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 1
        const z = Math.sin(angle) * 1
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.5]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.2} />
          </mesh>
        )
      })}
    </mesh>
  )
}

export default function RapidDevExperience() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls
          global
          rotation={[0.1, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 1]}
          speed={1.5}
          zoom={1.5}
          snap
        >
          <Float rotationIntensity={0.4} floatIntensity={0.2}>
            {/* Central element */}
            <AnimatedCube position={[0, 0, 0]} size={1.5} rotationSpeed={0.005} />
            
            {/* Orbiting elements */}
            <AnimatedCube position={[-2.5, 1, -1]} size={0.8} rotationSpeed={0.02} />
            <AnimatedCube position={[2.5, -1, -1]} size={0.8} rotationSpeed={0.015} />
            
            {/* Code blocks */}
            <CodeBlock position={[3, 1.5, 0]} rotation={[0.2, -0.5, 0.1]} scale={0.8} />
            <CodeBlock position={[-3, -1.5, 0]} rotation={[-0.2, 0.5, -0.1]} scale={0.8} />
            
            {/* Development gears */}
            <DevGear position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.7} />
            <DevGear position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.7} />
          </Float>
        </PresentationControls>
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
} 