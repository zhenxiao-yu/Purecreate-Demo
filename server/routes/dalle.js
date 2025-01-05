import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function validateSize(size) {
    const allowedSizes = ['256x256', '512x512', '1024x1024'];
    if (!allowedSizes.includes(size)) {
        throw new Error(`Invalid size. Allowed values: ${allowedSizes.join(', ')}`);
    }
}

router.post('/', async (req, res) => {
    try {
        const { prompt, size = '1024x1024' } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required to generate an image.' });
        }
        validateSize(size);

        const response = await openai.images.generate({ prompt, n: 1, size });
        const imageUrl = response.data[0].url;
        res.json({ imageUrl });
    } catch (error) {
        if (error.response) {
            res.status(500).json({ error: `Failed to generate image: ${error.response.data.error.message}` });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});

export default router;
