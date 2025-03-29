"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import Scene from "../components/scene";

export default function Home() {
  const store = createXRStore({});
  return (
    <main className="container mx-auto">
      <h1 className="mt-4 mb-4 text-4xl">React Three XR</h1>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas
        shadows
        className="aspect-video border border-gray-300"
        camera={{ position: [0, 20, 20], fov: 50 }}
      >
        <XR store={store}>
          <Scene />
        </XR>
      </Canvas>
    </main>
  );
}
