import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
const Sphere = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(elapsedTime) * 4;
      meshRef.current.position.z = Math.cos(elapsedTime) * 4;
    }
  });
  return (
    <mesh castShadow ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Sphere;
