import React, { useState } from "react";
import { handleSubmit, imageStyles } from "../../utils/ai-util.js";
import "./AIPicker.css";
import {PromptInput} from "./PromptInput.jsx";
import {StyleSelector} from "./StyleSelector.jsx";
import {CreativitySlider} from "./CreativitySlider.jsx";
import {AILoader} from "./AILoader.jsx";
import {Header} from "./Header.jsx";
import {AIResult} from "./AIResult.jsx";

const AIPicker = () => {
	const [form, setForm] = useState({
		prompt: "A lone tree standing on a small grassy hill under the sky",
		style: "default",
		creativity: 5,
	});
	const [generatingImg, setGeneratingImg] = useState(false);
	const [generatedImage, setGeneratedImage] = useState(null);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const handleGenerate = async () => {
		if (!form.prompt.trim()) {
			setError("Please enter a valid prompt.");
			return;
		}

		setGeneratingImg(true);
		setGeneratedImage(null);
		setError(null);

		try {
			const imageUrl = await handleSubmit(
				"generate",
				form.style,
				form.creativity,
				form.prompt,
				setGeneratingImg
			);
			if (imageUrl) {
				setGeneratedImage(imageUrl);
			} else {
				setError("Failed to generate the image. Please try again.");
			}
		} catch (error) {
			console.error("Error generating image:", error);
			setError("An error occurred. Please try again.");
		} finally {
			setGeneratingImg(false);
		}
	};

	const downloadImage = () => {
		const link = document.createElement("a");
		link.href = generatedImage;
		link.download = "generated-image.png";
		link.click();
	};

	return (
		<div className="ai-picker">
			<Header />
			{error && <p className="ai-picker-error">{error}</p>}

			<div className="ai-picker-form">
				<PromptInput value={form.prompt} onChange={handleChange} />
				<StyleSelector value={form.style} onChange={handleChange} styles={imageStyles} />
				<CreativitySlider value={form.creativity} onChange={handleChange} />
			</div>

			<AILoader
				generatingImg={generatingImg}
				onGenerate={handleGenerate}
				hasGeneratedImage={!!generatedImage}
			/>
			{generatedImage && (
				<AIResult
					image={generatedImage}
					onRegenerate={() => setGeneratedImage(null)}
					onDownload={downloadImage}
				/>
			)}
		</div>
	);
};

export default AIPicker;
