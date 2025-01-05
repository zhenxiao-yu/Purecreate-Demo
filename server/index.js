import express from 'express';
import dotenv from 'dotenv';
import generateImageRoute from './routes/dalle.js';
import healthRoute from './routes/health.js';
import miscRoute from './routes/misc.js';

dotenv.config();

const app = express();

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
