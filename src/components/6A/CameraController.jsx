import { useFrame, useThree } from "@react-three/fiber";

const CameraController = ({ modelRef }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      const modelPosition = modelRef.current.position;

      const offsetX = 0;
      const offsetY = 15;
      const offsetZ = -20;

      camera.position.set(
        modelPosition.x + offsetX,
        modelPosition.y + offsetY,
        modelPosition.z + offsetZ
      );

      camera.lookAt(modelPosition);
      // Камера смотрит на модель

      // Обновление управления камерой
    }
  });

  return null; // Возвращаем null, если ничего не нужно рендерить
};

export default CameraController;
