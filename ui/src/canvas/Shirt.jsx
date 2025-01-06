import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, OrbitControls } from '@react-three/drei';
import { createTextTexture } from '../utils/helpers.js';
import { easing } from 'maath';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt.glb');
  const orbitRef = useRef();

  // Preload textures
  const textures = {
    logo: useTexture(snap.frontLogoDecal),
    full: useTexture(snap.fullDecal),
    backLogo: useTexture(snap.backLogoDecal),
  };

  // Update material color smoothly
  useFrame((_, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    if (orbitRef.current) orbitRef.current.update();
  });

  const renderDecals = () => (
      <>
        {snap.isFullTexture && (
            <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1}
                map={textures.full}
                depthTest={false}
                depthWrite={true}
            />
        )}

        {snap.isFrontLogoTexture && (
            <Decal
                position={snap.frontLogoPosition}
                rotation={[0, 0, 0]}
                scale={snap.frontLogoScale}
                map={textures.logo}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
            />
        )}

        {snap.isFrontText && (
            <Decal
                position={snap.frontTextPosition}
                rotation={snap.frontTextRotation}
                scale={snap.frontTextScale}
                map={createTextTexture(
                    snap.frontText,
                    snap.frontTextFont,
                    snap.frontTextSize,
                    snap.frontTextColor
                )}
            />
        )}

        {snap.isBackLogoTexture && (
            <Decal
                position={snap.backLogoPosition}
                rotation={snap.backLogoRotation}
                scale={snap.backLogoScale}
                map={textures.backLogo}
                map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
            />
        )}

        {snap.isBackText && (
            <Decal
                position={snap.backTextPosition}
                rotation={snap.backTextRotation}
                scale={snap.backTextScale}
                map={createTextTexture(
                    snap.backText,
                    snap.backTextFont,
                    snap.backTextSize,
                    snap.backTextColor
                )}
            />
        )}
      </>
  );

  return (
      <>
        <OrbitControls
            ref={orbitRef}
            enablePan
            enableZoom
            enableRotate
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
        />
        <group key={JSON.stringify(snap)}>
          <mesh
              geometry={nodes.T_Shirt_male.geometry}
              material={materials.lambert1}
              material-metalness={0.1}
              dispose={null}
          >
            {renderDecals()}
          </mesh>
        </group>
      </>
  );
};

export default Shirt;
