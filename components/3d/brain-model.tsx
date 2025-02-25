import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export default function BrainModel(props: any) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/models/brain.gltf") as any

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Brain.geometry}
        material={materials.BrainMaterial}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload("/models/brain.gltf") 