import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Model = ({
  url,
  rotationX = 0,
  rotationY = 0,
  position = [0, 0, 0],
  scale = 1,
}) => {
  const gltf = useLoader(GLTFLoader, url);

  gltf.scene.rotation.x = rotationX;
  gltf.scene.rotation.y = rotationY;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(...position);

  return <primitive object={gltf.scene} />;
};

export default Model;
