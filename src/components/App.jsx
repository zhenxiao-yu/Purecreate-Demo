'use client';

import dynamic from 'next/dynamic';
import Home from '@/pages-legacy/Home';
import Customizer from '@/pages-legacy/Customizer';
import AnimatedCursor from 'react-animated-cursor';

// Three.js / r3f must run client-side only — disable SSR for the canvas
const Canvas = dynamic(() => import('@/canvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <div className="w-10 h-10 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm tracking-wide">Loading 3D scene…</span>
      </div>
    </div>
  ),
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
