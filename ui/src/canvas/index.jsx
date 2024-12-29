import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';

import state from '../store';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { calculateFov } from '../config/helpers';

// ErrorBoundary to catch rendering errors in the Canvas component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info); // Log error details
  }

  render() {
    return this.state.hasError
        ? <div>Something went wrong. Please reload the page.</div>
        : this.props.children;
  }
}

// Main Canvas component to render the 3D model
const CanvasModel = () => {
  const [fov, setFov] = useState(25); // Field of View for the camera
  const snap = useSnapshot(state); // Access reactive state with Valtio

  useEffect(() => {
    const updateFov = () => setFov(calculateFov(window.innerWidth)); // Dynamically update FOV

    updateFov(); // Initial FOV calculation
    window.addEventListener('resize', updateFov); // Adjust FOV on window resize

    return () => window.removeEventListener('resize', updateFov);
  }, []);

  return (
      <ErrorBoundary>
        <Canvas
            camera={{position: [0, 0, 5], fov}}
            gl={{preserveDrawingBuffer: true}}
            shadows
            className="w-full max-w-full h-full transition-all ease-in"
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.5}/>
          <directionalLight
              castShadow
              position={[5, 5, 5]}
              intensity={0.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.5}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
          />


          {/* Camera controls */}
          <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={2}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
          />

          {/* 3D scene components */}
          <CameraRig>
            <Backdrop/>
            <Center position={snap.intro ? [0.45, 0, 0] : [0, 0, 0]}>
              <Shirt castShadow receiveShadow/>
            </Center>
          </CameraRig>
        </Canvas>
      </ErrorBoundary>
  );
};

export default CanvasModel;
