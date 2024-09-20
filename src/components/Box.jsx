import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const Box = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsedTime;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshBasicMaterial color={"#00FF00"} />
    </mesh>
  );
};

export default Box;
