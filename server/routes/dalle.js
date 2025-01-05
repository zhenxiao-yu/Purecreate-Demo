import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import {validatePrompt, validateSize} from "../utils/helper.js";

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



router.post('/', async (req, res) => {
    try {
        const { prompt, size = '1024x1024' } = req.body;

        // Input validations
        validatePrompt(prompt);
        validateSize(size);

        // Generate image
        const response = await openai.images.generate({ prompt, n: 1, size });
        const imageUrl = response.data[0]?.url;

        if (!imageUrl) {
            throw new Error('Failed to retrieve the generated image URL.');
        }

        res.json({ success: true, imageUrl });
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        res.status(statusCode).json({
            success: false,
            error: errorMessage,
        });
    }
});

export default router;
