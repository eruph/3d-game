const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Plane;
