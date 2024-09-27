import { usePlane } from "@react-three/cannon";

const Plane = () => {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
};
export default Plane;
