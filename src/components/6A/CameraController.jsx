import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Vector3 } from "three";

const CameraController = ({ modelRef, addZ, addX }) => {
  const { camera } = useThree();
  const [x, setX] = useState(addX);
  const [y, setY] = useState(20);
  const [z, setZ] = useState(addZ);

  const [cameraOffset, setCameraOffset] = useState(new Vector3(0, 10, -10));
  const cameraFollow = useRef(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setY((y) => y + 1);
          break;
        case "ArrowDown":
          setY((y) => y - 1);
          break;
        case "ArrowRight":
          setX((x) => x + 1);
          break;
        case "ArrowLeft":
          setX((x) => x - 1);
          break;
        case "c":
          cameraFollow.current = !cameraFollow.current;
          break;
        case "s":
          setCameraOffset(new Vector3(0, 10, 20));
          break;
        case "w":
          setCameraOffset(new Vector3(0, 10, -20));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useFrame(() => {
    if (modelRef.current) {
      const robotPosition = modelRef.current.position;

      if (cameraFollow.current) {
        
        // Камера будет следовать за роботом, удерживая определённый угол и расстояние
        camera.position.lerp(
          new Vector3(
            robotPosition.x + cameraOffset.x,
            robotPosition.y + cameraOffset.y,
            robotPosition.z + cameraOffset.z
          ),
          0.1
        );
      } else {
        // Камера просто будет двигаться на основе клавиш, но не следовать за роботом
        camera.position.lerp(
          new Vector3(
            robotPosition.x + x,
            robotPosition.y + y,
            robotPosition.z - z
          ),
          0.1
        );
      }
      camera.lookAt(modelRef.current.position);
    }
  });

  return null;
};

export default CameraController;
