"use client";

import { Suspense, useEffect, useState } from "react";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { Cursor, useDragConstraint } from "@/hooks/drag";

const Box = ({ color }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [
      (Math.random() - 0.5) * 0.5,
      (Math.random() + 5) * 0.5,
      (Math.random() - 0.5) * 0.5,
    ],
    rotation: [Math.random(), Math.random(), Math.random()],
    args: [0.1, 0.1, 0.1],
  }));
  const bind = useDragConstraint(ref);

  return (
    <mesh ref={ref} {...bind} castShadow>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 1, 0],
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.3} />
    </mesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
      />
      <directionalLight
        position={[-10, 20, -10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
      />
      <pointLight position={[0, 20, 0]} intensity={0.5} />
    </>
  );
};

const Shadows = () => {
  return (
    <AccumulativeShadows
      temporal
      frames={100}
      color="#316d39"
      colorBlend={0.5}
      opacity={1}
      scale={20}
      position={[0, -0.01, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={10}
        ambient={0.5}
        position={[5, 5, -10]}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
};

const Scene = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45aaf2",
      "#fed330",
      "#fd9644",
      "#a55eea",
    ];

    setBoxes(
      Array.from({ length: 50 }, (_, i) => (
        <Box
          key={i}
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
      ))
    );
  }, []);

  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <Lights />
      <Shadows />
      <Suspense>
        <Physics>
          <Cursor />
          <Plane />
          {boxes}
        </Physics>
      </Suspense>
    </>
  );
};

export default Scene;
