import express from 'express';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import generateImageRoute from './routes/dalle.js';
import healthRoute from './routes/health.js';
import miscRoute from './routes/misc.js';

dotenv.config();

const app = express();

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type'], // Allowed headers
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use EJS as the templating engine
app.set('view engine', 'ejs');

// Define routes
app.use('/image', generateImageRoute);
app.use('/health', healthRoute);
app.use('/misc', miscRoute);

// Default route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to the Image Generation API' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
