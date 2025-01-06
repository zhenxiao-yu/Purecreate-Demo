import React, { useState } from "react";
import CustomButton from "../CustomButton.jsx";
import { handleSubmit } from "../../utils/ai-util.js";
import "./AIPicker.css";

const AIPicker = ({ handleDecals }) => {
	const [prompt, setPrompt] = useState("");
	const [style, setStyle] = useState("default");
	const [creativity, setCreativity] = useState(5);
	const [generatingImg, setGeneratingImg] = useState(false);

	const styles = [
		{ value: "default", label: "Default" },
		{ value: "modern", label: "Modern" },
		{ value: "classic", label: "Classic" },
		{ value: "abstract", label: "Abstract" },
	];

	const buttonTypes = [
		{ type: "front", label: "Front", buttonStyle: "outline" },
		{ type: "back", label: "Back", buttonStyle: "outline" },
		{ type: "full", label: "Full", buttonStyle: "filled" },
	];

	const handleGenerate = (type) => {
		if (!prompt) {
			alert("Please enter a prompt!");
			return;
		}
		setGeneratingImg(true);
		handleSubmit(type, style, creativity, prompt, handleDecals, setGeneratingImg);
	};

	return (
		<div className="ai-picker">
			{/* Header Section */}
			<div className="ai-picker-header">
				<h2>AI Assistant</h2>
				<p>Enter your prompt below and let AI help create something amazing!</p>
			</div>

			{/* Prompt Input */}
			<div className="ai-picker-section">
				<label htmlFor="prompt" className="ai-picker-label">
					Your Prompt
				</label>
				<textarea
					id="prompt"
					rows={5}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Ask AI..."
					className="ai-picker-textarea"
				/>
			</div>

			{/* Style Selector */}
			<div className="ai-picker-section">
				<label htmlFor="style" className="ai-picker-label">
					Choose Style
				</label>
				<select
					id="style"
					value={style}
					onChange={(e) => setStyle(e.target.value)}
					className="ai-picker-select"
				>
					{styles.map(({ value, label }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</div>

			{/* Creativity Slider */}
			<div className="ai-picker-section">
				<label htmlFor="creativity" className="ai-picker-label">
					Creativity Level
				</label>
				<input
					id="creativity"
					type="range"
					min="1"
					max="10"
					value={creativity}
					onChange={(e) => setCreativity(e.target.value)}
					className="ai-picker-slider"
				/>
				<p
					className={`ai-picker-creativity-level ${
						creativity > 7 ? "high" : creativity < 4 ? "low" : "medium"
					}`}
				>
					Level: {creativity}
				</p>
			</div>

			{/* Action Buttons */}
			<div className="ai-picker-actions">
				{generatingImg ? (
					<div className="ai-picker-loader">
						<div className="spinner"></div>
					</div>
				) : (
					buttonTypes.map(({ type, label, buttonStyle }) => (
						<CustomButton
							key={type}
							type={buttonStyle}
							title={label}
							handleClick={() => handleGenerate(type)}
							customStyles="ai-picker-button"
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AIPicker;
