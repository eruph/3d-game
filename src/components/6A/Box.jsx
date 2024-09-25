const Box = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[6, 6, 6]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};

export default Box;
