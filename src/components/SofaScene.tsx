import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SofaSceneProps {
  color: string;
  texture: string;
}

function Sofa({ color, texture }: { color: string; texture: string }) {
  const sofaRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(color);
      
      // Apply texture properties based on selection
      switch (texture) {
        case 'leather':
          materialRef.current.roughness = 0.3;
          materialRef.current.metalness = 0.1;
          break;
        case 'fabric':
          materialRef.current.roughness = 0.9;
          materialRef.current.metalness = 0;
          break;
        case 'velvet':
          materialRef.current.roughness = 0.7;
          materialRef.current.metalness = 0.05;
          break;
        case 'linen':
          materialRef.current.roughness = 0.85;
          materialRef.current.metalness = 0;
          break;
      }
    }
  }, [color, texture]);

  return (
    <group ref={sofaRef} position={[0, -0.5, 0]}>
      {/* Main sofa body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 1.2]} />
        <meshStandardMaterial ref={materialRef} color={color} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.2, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Left armrest */}
      <mesh position={[-1.4, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 1.4, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right armrest */}
      <mesh position={[1.4, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 1.4, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Cushions */}
      <mesh position={[-0.8, 0.85, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.15, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.8, 0.85, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.15, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Base/Legs */}
      <mesh position={[-1.2, -0.1, 0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, -0.1, 0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.2, -0.1, -0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, -0.1, -0.4]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function SofaScene({ color, texture }: SofaSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight position={[-5, 5, 5]} intensity={0.5} angle={0.3} penumbra={1} />
        
        {/* Scene */}
        <Sofa color={color} texture={texture} />
        
        {/* Environment and controls */}
        <Environment preset="apartment" />
        <ContactShadows 
          position={[0, -0.7, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4}
        />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
