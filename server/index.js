import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateImageRoute from './routes/dalle.js';
import healthRoute from './routes/health.js';
import miscRoute from './routes/misc.js';

dotenv.config();

const app = express();

// Environment Variables
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Enable CORS with dynamic origin
const corsOptions = {
    origin: FRONTEND_URL, // Replace with your frontend's URL or an array for multiple origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS as templating engine
app.set('view engine', 'ejs');

// Routes
app.use('/image', generateImageRoute);
app.use('/health', healthRoute);
app.use('/misc', miscRoute);

// Default route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to the Image Generation API' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
