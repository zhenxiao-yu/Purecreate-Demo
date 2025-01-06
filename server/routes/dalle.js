import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Ensure you import node-fetch for backend use
import cors from "cors";
import { validatePrompt, validateSize } from "../utils/helper.js";

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined in the environment variables.");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Enable CORS (Optional)
router.use(cors());

router.post("/", async (req, res) => {
    try {
        const { prompt, size = "1024x1024" } = req.body;

        // Validate input
        validatePrompt(prompt);
        validateSize(size);

        // Generate image using OpenAI API
        const response = await openai.images.generate({ prompt, n: 1, size });
        const imageUrl = response.data[0]?.url;

        if (!imageUrl) {
            throw new Error("Failed to retrieve the generated image URL.");
        }

        // Fetch the image and convert to Base64
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
            throw new Error("Failed to fetch the image from OpenAI.");
        }

        const arrayBuffer = await imageResponse.arrayBuffer();
        const base64Image = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

        res.json({ success: true, base64Image });
    } catch (error) {
        console.error("Error generating or fetching image:", error);

        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        res.status(statusCode).json({
            success: false,
            error: errorMessage,
        });
    }
});

export default router;
