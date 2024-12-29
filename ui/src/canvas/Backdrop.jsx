import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

/**
 * Backdrop Component
 * Renders a dynamic backdrop with accumulative shadows and randomized lights.
 */
const Backdrop = () => {
  const shadowsRef = useRef(); // Ref to the AccumulativeShadows

  return (
      <AccumulativeShadows
          ref={shadowsRef}
          temporal // Enable temporal anti-aliasing for smoother shadows
          frames={90} // Number of frames to accumulate shadows
          alphaTest={0.85} // Remove fragments with alpha below this threshold
          scale={10} // Scale of the shadow plane
          rotation={[Math.PI / 2, 0, 0]} // Rotate to lay flat on the XZ plane
          position={[0, 0, -0.14]} // Slight offset for proper placement
      >
        {/* Primary randomized light */}
        <RandomizedLight
            amount={4} // Number of light sources
            radius={9} // Spread radius of the lights
            intensity={0.85} // Brightness of the light
            ambient={0.15} // Ambient lighting intensity
            position={[5, 5, -10]} // Light position
        />

        {/* Secondary randomized light */}
        <RandomizedLight
            amount={4}
            radius={5}
            intensity={0.85}
            ambient={0.15}
            position={[-5, 5, -9]} // Light position
        />
      </AccumulativeShadows>
  );
};

export default Backdrop;
