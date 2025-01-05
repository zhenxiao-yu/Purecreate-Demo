import { Router } from 'express';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

// Create a new router instance
const router = Router();

// POST route for generating an image
router.post('/generate', async (req, res) => {
    const { prompt, size = '1024x1024' } = req.body;

    try {
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required to generate an image.' });
        }

        console.log(`Generating image for prompt: "${prompt}" with size: ${size}`);

        const response = await openai.images.generate({
            prompt,
            n: 1, // Number of images to generate
            size, // Supported sizes: '256x256', '512x512', '1024x1024'
        });

        const imageUrl = response.data[0].url;

        console.log('Image successfully generated:', imageUrl);

        return res.status(200).json({ imageUrl });
    } catch (error) {
        if (error.response) {
            console.error('OpenAI API Error:', error.response.data);
            return res.status(500).json({
                error: `Failed to generate image: ${error.response.data.error.message}`,
            });
        } else {
            console.error('Unexpected Error:', error.message);
            return res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});

export default router;
