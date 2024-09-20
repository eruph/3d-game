const Circle = () => {
  return (
    <mesh position={[5, 1, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial wireframe={true} color="blue" />
    </mesh>
  );
};

export default Circle;
