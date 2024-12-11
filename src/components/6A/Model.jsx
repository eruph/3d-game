import { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "./CameraController";
import { useControls } from "leva";
const Model = ({ url, boxes }) => {
  // LEVA SETPARAMETERS
  const { speed, jumpHeight, gravity } = useControls({
    speed: { value: 0.15, min: 0, max: 15 },
    jumpHeight: { value: 0.9, min: 0, max: 100 },
    gravity: { value: -0.041, min: -1, max: 1 },
  });

  // ACTIONS
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [isPuching, setIsPunching] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  // PARAMETERS
  const [jumpVelocity, setJumpVelocity] = useState(0);
  const modelRef = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  const [addZ] = useState(25);
  const [addX] = useState(0);
  const animationSpeed = 0.5;

  // FUNCTIONS
  useEffect(() => {
    if (actions) {
      if (moveForward || moveBackward ) {
        actions["Running"].play();
      } else {
        actions["Running"].stop();
      }
      if (isJumping) {
        actions["Jump"].play();
        actions["Jump"].timeScale = animationSpeed;
      } else {
        actions["Jump"].stop();
      }
      if (isDancing) {
        actions["Dance"].play();
      } else {
        actions["Dance"].stop();
      }
      if (isPuching) {
        actions["Punch"].play();
      } else {
        actions["Punch"].stop();
      }
      if (isWaving) {
        actions["Wave"].play();
      } else {
        actions["Wave"].stop();
      }
    }
  }, [
    actions,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    isJumping,
    isDancing,
    isPuching,
    isWaving,
  ]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
        case "ц":
          setMoveForward(true);
          break;
        case "s":
        case "ы":
          setMoveBackward(true);
          break;
        case "a":
        case "ф":
          setMoveLeft(true);
          break;
        case "d":
        case "в":
          setMoveRight(true);
          break;
        case " ":
          if (!isJumping) {
            setIsJumping(true);
            setJumpVelocity(jumpHeight);
          }
          break;
        case "r":
        case "к":
          if (!isPuching) {
            setIsPunching(true);
          }
          break;
        case "t":
        case "е":
          if (!isDancing) {
            setIsDancing(true);
          }
          break;
        case "y":
        case "н":
          if (!isWaving) {
            setIsWaving(true);
          }
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case "w":
        case "ц":
          setMoveForward(false);
          break;
        case "s":
        case "ы":
          setMoveBackward(false);
          break;
        case "a":
        case "ф":
          setMoveLeft(false);
          break;
        case "d":
        case "в":
          setMoveRight(false);
          break;
        case "r":
        case "к":
          setIsPunching(false);
          break;
        case "t":
        case "е":
          setIsDancing(false);
          break;
        case "y":
        case "н":
          setIsWaving(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping, isDancing, isWaving, isPuching]);

  useFrame(() => {
    if (!modelRef.current) return;
  
    const model = modelRef.current;
  
    // Получение границ модели
    const boundingBox = new THREE.Box3().setFromObject(model);
  
    // Смещения для запуска лучей
    const offsets = [
      new THREE.Vector3(0, 0, -1), // Вперед
      new THREE.Vector3(0, 0, 1),  // Назад
      new THREE.Vector3(-1, 0, 0), // Влево
      new THREE.Vector3(1, 0, 0),  // Вправо
    ];
  
    let collisionDetected = false;
  
    for (const offset of offsets) {
      const rayOrigin = new THREE.Vector3()
        .copy(model.position)
        .add(offset.multiplyScalar(2)); // Учитываем смещение от центра
  
      raycaster.current.set(rayOrigin, offset.normalize());
  
      const intersects = raycaster.current.intersectObjects(boxes, true);
  
      if (intersects.length > 0 && intersects[0].distance < 1) {
        collisionDetected = true;
        break;
      }
    }
  
    // Движение блокируется, если есть столкновение
    if (!collisionDetected) {
      if (moveForward) {
        const deltaX = Math.sin(model.rotation.y) * speed;
        const deltaZ = Math.cos(model.rotation.y) * speed;
        model.position.z += deltaZ;
        model.position.x += deltaX;
      }
      if (moveBackward) {
        const deltaX = Math.sin(model.rotation.y) * speed;
        const deltaZ = Math.cos(model.rotation.y) * speed;
        model.position.z -= deltaZ;
        model.position.x -= deltaX;
      }
    }
  
    // Ротация
    if (moveLeft) {
      model.rotation.y += 0.02;
    }
    if (moveRight) {
      model.rotation.y -= 0.02;
    }
  
    // Прыжки
    if (isJumping) {
      model.position.y += jumpVelocity;
      setJumpVelocity((prev) => prev + gravity);
  
      if (model.position.y <= 0) {
        model.position.y = 0;
        setIsJumping(false);
        setJumpVelocity(0);
      }
    }
  });
  
  return (
    <>
      <CameraController modelRef={modelRef} addZ={addZ} addX={addX}  />
      <primitive ref={modelRef} object={scene} scale={1.5} />
    </>
  );
};

export default Model;
