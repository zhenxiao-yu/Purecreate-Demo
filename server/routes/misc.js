import express from 'express';

const router = express.Router();

//endpoint to show miscellaneous information about the server
router.get('/', (req, res) => {
    res.json({
        serviceName: 'Image Generation API',
        version: '1.0.0',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        serverTime: new Date().toISOString(),
        availableEndpoints: [
            { method: 'POST', path: '/image', description: 'Generate an image from a prompt' },
            { method: 'GET', path: '/health', description: 'Check API health' },
            { method: 'GET', path: '/misc', description: 'Get metadata and diagnostics' },
        ],
    });
});

export default router;
