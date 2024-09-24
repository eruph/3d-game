import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const Model = ({ url }) => {
  const meshRef = useRef();
  const obj = useLoader(OBJLoader, url);

  useEffect(() => {
    if (meshRef.current && obj) {
      meshRef.current.add(obj);
    }
  }, [obj]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsedTime;
    }
  });
  return <group ref={meshRef} />;
};

export default Model;
