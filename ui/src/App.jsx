import Canvas from './canvas'; // Import the 3D Canvas component
import Customizer from './pages/Customizer'; // Import the Customizer page/component
import Home from './pages/Home'; // Import the Home page/component
import AnimatedCursor from 'react-animated-cursor'; // Import AnimatedCursor for custom cursor effects

/**
 * Main Application Component
 * Combines Home, Canvas, and Customizer components into a cohesive layout.
 */
function App() {
    return (
        <main className="app transition-all ease-in">
            {/* Animated Cursor Configuration */}
            <AnimatedCursor
                innerSize={4}
                outerSize={6}
                color="46, 46, 46"
                outerAlpha={0.5}
                innerScale={3}
                outerScale={6}
                trailingSpeed={9}
            />

            {/* Render the Home page */}
            <Home />

            {/* Render the Canvas for the 3D model viewer */}
            <Canvas />

            {/* Render the Customizer for user interaction */}
            <Customizer />
        </main>
    );
}

export default App;
