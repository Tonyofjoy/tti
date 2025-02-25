"use client"

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import { MotionConfig } from 'framer-motion'
import { Mesh } from 'three'

// Main 3D experience component
const RapidDevExperience = () => {
  return (
    <div className="h-[50vh] sm:h-[500px] w-full bg-slate-950 rounded-xl overflow-hidden">
      <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
        <Canvas shadows dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          <PrototypeScene />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </MotionConfig>
    </div>
  )
}

// Set display name for the component
RapidDevExperience.displayName = 'RapidDevExperience';

// Component for the prototype scene
const PrototypeScene = () => {
  const cubesRef = useRef<(Mesh | null)[]>([]);
  const { viewport } = useThree();
  
  useEffect(() => {
    // Initialize cube positions
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      
      const angle = (i / 5) * Math.PI * 2;
      const radius = 2;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.z = Math.sin(angle) * radius;
      cube.position.y = Math.sin(i * 0.5) * 0.5;
      
      // Random rotation
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      cube.rotation.z = Math.random() * Math.PI;
    });
  }, []);
  
  useFrame((_, delta) => {
    // Animate cubes
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      
      cube.rotation.x += 0.01 * (i % 2 ? 1 : -1);
      cube.rotation.y += 0.01 * (i % 3 ? 1 : -1);
      
      // Gentle floating motion
      cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
    });
  });
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      
      {/* Central structure representing a development prototype */}
      <mesh
        position={[0, 0, 0]}
        scale={1}
        rotation={[0, 0, 0]}
      >
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color="#4F46E5" 
          emissive="#4F46E5"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Orbital cubes representing features or components */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el: Mesh | null) => { cubesRef.current[i] = el }}
          position={[0, 0, 0]}
        >
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial 
            color={["#38BDF8", "#818CF8", "#C084FC", "#60A5FA", "#34D399"][i]} 
            roughness={0.5}
            metalness={0.6}
          />
        </mesh>
      ))}
    </>
  );
};

// Set display name
PrototypeScene.displayName = 'PrototypeScene';

export default RapidDevExperience; 