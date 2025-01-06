import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors"; // Ensure cross-origin requests work
import { validatePrompt, validateSize } from "../utils/helper.js";

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined in the environment variables.");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Enable CORS (Optional if globally enabled)
router.use(cors());

// Route to generate image
router.post("/", async (req, res) => {
    try {
        const { prompt, size = "1024x1024" } = req.body;

        // Input validation
        validatePrompt(prompt); // Ensure prompt is valid
        validateSize(size); // Ensure size is valid (e.g., "256x256", "512x512", "1024x1024")

        // Generate image using OpenAI API
        const response = await openai.images.generate({ prompt, n: 1, size });
        const imageUrl = response.data[0]?.url;

        if (!imageUrl) {
            throw new Error("Failed to retrieve the generated image URL.");
        }

        // Respond with the generated image URL
        res.json({ success: true, imageUrl });
    } catch (error) {
        // Log full error for debugging
        console.error("Error generating image:", error);

        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        // Return error response to client
        res.status(statusCode).json({
            success: false,
            error: errorMessage,
        });
    }
});

export default router;
