import { ColladaLoader } from "three/examples/jsm/Addons.js";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
const Model = ({ url }) => {
  const meshRef = useRef();

  useEffect(() => {
    const loader = new ColladaLoader();
    loader.load(url, (collada) => {
      const model = collada.scene;
      model.scale.set(1, 1, 1);
      meshRef.current.add(model);
    });
  }, [url]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return <group ref={meshRef} />;
};

export default Model;
