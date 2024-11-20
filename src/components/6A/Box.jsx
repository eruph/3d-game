import { Edges } from "@react-three/drei";
import { useState } from "react";

const Box = ({ position }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[6, 6, 6]} />
      <meshBasicMaterial color="green" />
      {hovered && <Edges threshold={1} scale={1.05} color="white" />}
    </mesh>
  );
};

export default Box;
