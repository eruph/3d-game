import { Edges } from "@react-three/drei";
import { useState } from "react";
import { useBox } from "@react-three/cannon";
const Box = () => {
  const [hovered, setHovered] = useState(false);

  const [ref] = useBox(() => ({
    mass: 0 ,
    position: [5, 5, 5],
    args: [5, 5, 5],
  }));
  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color="green" />
      {hovered && <Edges threshold={1} scale={1.05} color="white" />}
    </mesh>
  );
};

export default Box;
