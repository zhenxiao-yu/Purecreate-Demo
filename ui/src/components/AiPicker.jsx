import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { handleSubmit } from '../utils/ai-util.js';

const AIPicker = ({ handleDecals }) => {
	const [prompt, setPrompt] = useState('');
	const [style, setStyle] = useState('default');
	const [creativity, setCreativity] = useState(5);
	const [generatingImg, setGeneratingImg] = useState(false);

	const handleGenerate = (type) => {
		if (!prompt) {
			alert('Please enter a prompt!');
			return;
		}
		setGeneratingImg(true);
		handleSubmit(type, style, creativity, prompt, handleDecals, setGeneratingImg);
	};

	return (
		<div className="absolute left-full ml-3 p-4 bg-white rounded-lg shadow-md w-80 transform hover:scale-105">
			<div className="text-center">
				<h2 className="text-2xl font-extrabold mb-2 text-gray-800">AI Assistant</h2>
				<p className="text-gray-600 text-sm">Enter your prompt below and let AI help create something amazing!</p>
			</div>

			<div className="my-4">
				<label className="block mb-2 text-sm font-semibold text-gray-700">Your Prompt</label>
				<textarea
					rows={5}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Ask AI..."
					className="w-full p-4 text-sm border-2 rounded-lg bg-gray-100 border-gray-300 focus:ring-2 focus:ring-gray-500 resize-none shadow-inner"
				/>
			</div>

			<div className="my-4">
				<label className="block mb-2 text-sm font-semibold text-gray-700">Choose Style</label>
				<select
					value={style}
					onChange={(e) => setStyle(e.target.value)}
					className="w-full p-2 text-sm border-2 rounded-lg bg-gray-100 border-gray-300 focus:ring-2 focus:ring-gray-500"
				>
					<option value="default">Default</option>
					<option value="modern">Modern</option>
					<option value="classic">Classic</option>
					<option value="abstract">Abstract</option>
				</select>
			</div>

			<div className="my-4">
				<label className="block mb-2 text-sm font-semibold text-gray-700">Creativity Level</label>
				<input
					type="range"
					min="1"
					max="10"
					value={creativity}
					onChange={(e) => setCreativity(e.target.value)}
					className="w-full focus:ring-2 focus:ring-gray-500"
				/>
				<p className={`text-sm text-center font-semibold ${creativity > 7 ? 'text-red-500' : creativity < 4 ? 'text-green-500' : 'text-gray-600'}`}>
					Level: {creativity}
				</p>
			</div>

			<div className="flex justify-center gap-4">
				{generatingImg ? (
					<div className="w-40 h-12 flex items-center justify-center">
						<div className="w-6 h-6 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
					</div>
				) : (
					['Front', 'Back', 'Full'].map((type) => (
						<CustomButton
							key={type}
							type={type === 'Full' ? 'filled' : 'outline'}
							title={type}
							handleClick={() => handleGenerate(type.toLowerCase())}
							customStyles="w-40 h-12 text-sm transition transform hover:scale-105"
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AIPicker;
