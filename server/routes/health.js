import express from 'express';

const router = express.Router();

// health endpoint to check server health
router.get('/', (req, res) => {
    res.json({
        status: 'UP',
        message: 'API is running smoothly',
        timestamp: new Date().toISOString(),
    });
});

export default router;
