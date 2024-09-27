import { Edges } from "@react-three/drei";
import { useState } from "react";
import { useBox } from "@react-three/cannon";
const Box = () => {
  const [hovered, setHovered] = useState(false);

  const [ref] = useBox(() => ({
    mass: 1,
    position: [7, 7, 7],
    args: [7, 7, 7],
  }));
  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[7, 7, 7]} />
      <meshStandardMaterial color="green" />
      {hovered && <Edges threshold={1} scale={1.05} color="white" />}
    </mesh>
  );
};

export default Box;
