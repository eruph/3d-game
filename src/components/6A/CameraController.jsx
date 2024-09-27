import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraController = ({ modelRef, addZ, addX}) => {
  const { camera } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      camera.position.lerp(
        new Vector3(
          modelRef.current.position.x + addX,
          modelRef.current.position.y + 20,
          modelRef.current.position.z - addZ
        ),
        0.1
      );
      camera.lookAt(modelRef.current.position);
    }
  });

  return null;
};

export default CameraController;
