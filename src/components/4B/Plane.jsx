const Plane = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 20]} />
      <shadowMaterial opacity={0.3} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

export default Plane;
