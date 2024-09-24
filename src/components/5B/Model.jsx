import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const Model = ({ url }) => {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} />;
};

export default Model;
