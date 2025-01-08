import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js'; // Centralized routes import
import { corsConfig, envCheck } from './utils/config.js'; // Utility functions

dotenv.config();

// Check required environment variables
envCheck(['PORT', 'FRONTEND_URL']);

const app = express();

// Environment Variables
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors(corsConfig(FRONTEND_URL))); // Apply CORS configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
routes(app); // Register routes dynamically

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`); // Improved logging
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
