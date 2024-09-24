import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const Model = ({ url }) => {
  const obj = useLoader(OBJLoader, url);
  obj.rotation.x = Math.PI / 2;
  obj.rotation.y = Math.PI;
  return <primitive object={obj} />;
};

export default Model;
