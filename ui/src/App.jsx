import Canvas from './canvas'; // Import the 3D Canvas component
import Customizer from './pages/Customizer'; // Import the Customizer page/component
import Home from './pages/Home'; // Import the Home page/component

/**
 * Main Application Component
 * Combines Home, Canvas, and Customizer components into a cohesive layout.
 */
function App() {
    return (
        <main className="app transition-all ease-in">
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
