import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Box = () => {
  const meshRef = useRef();
  const navigate = useNavigate();

  const switchPage = () => {
    navigate("/");
  };
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsedTime;
      meshRef.current.rotation.x = elapsedTime;
    }
  });
  return (
    <mesh castShadow onClick={switchPage} ref={meshRef} position={[-1, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Box;
