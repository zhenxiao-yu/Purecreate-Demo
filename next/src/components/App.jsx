'use client';

import dynamic from 'next/dynamic';
import Home from '@/pages-legacy/Home';
import Customizer from '@/pages-legacy/Customizer';
import AnimatedCursor from 'react-animated-cursor';

// Three.js / r3f must run client-side only — disable SSR for the canvas
const Canvas = dynamic(() => import('@/canvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function App() {
  return (
    <main className="app transition-all ease-in">
      <AnimatedCursor
        innerSize={4}
        outerSize={6}
        color="46, 46, 46"
        outerAlpha={0.5}
        innerScale={3}
        outerScale={6}
        trailingSpeed={9}
      />
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}
