import React, { useState } from 'react';
import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
	const [style, setStyle] = useState('default');
	const [creativity, setCreativity] = useState(5);

	return (
		<div className="absolute left-full ml-3 p-4 bg-white rounded-lg shadow-md w-80">
			<div className="text-center">
				<h2 className="text-2xl sm:text-3xl font-bold mb-2">AI Assistant</h2>
				<p className="text-gray-600 text-sm sm:text-base">
					Enter your prompt below and let AI help create something amazing!
				</p>
			</div>

			{/* Textarea for Prompt */}
			<textarea
				placeholder="Ask AI..."
				rows={5}
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="w-full p-4 text-sm sm:text-base border-2 rounded-lg bg-gray-100 border-gray-500 focus:outline-none focus:border-gray-800 resize-none shadow-inner"
			/>

			{/* Style Selector */}
			<div className="my-4">
				<label className="block mb-2 text-sm sm:text-base font-semibold">Choose Style</label>
				<select
					value={style}
					onChange={(e) => setStyle(e.target.value)}
					className="w-full p-2 text-sm sm:text-base border-2 rounded-lg bg-gray-100 border-gray-500 focus:outline-none focus:border-gray-800"
				>
					<option value="default">Default</option>
					<option value="modern">Modern</option>
					<option value="classic">Classic</option>
					<option value="abstract">Abstract</option>
				</select>
			</div>

			{/* Creativity Level Selector */}
			<div className="my-4">
				<label className="block mb-2 text-sm sm:text-base font-semibold">Creativity Level</label>
				<input
					type="range"
					min="1"
					max="10"
					value={creativity}
					onChange={(e) => setCreativity(e.target.value)}
					className="w-full"
				/>
				<p className="text-sm sm:text-base text-gray-600 text-center">
					Level: {creativity}
				</p>
			</div>

			{/* Action Buttons */}
			<div className="flex w-full justify-center gap-4">
				{generatingImg ? (
					<CustomButton
						type="outline"
						title="Asking AI..."
						customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base transition transform hover:scale-105 duration-300"
					/>
				) : (
					<>
						<CustomButton
							type="outline"
							title="AI Logo"
							handleClick={() => handleSubmit('logo', style, creativity)}
							customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base transition transform hover:scale-105 duration-300"
						/>
						<CustomButton
							type="filled"
							title="AI Full"
							handleClick={() => handleSubmit('full', style, creativity)}
							customStyles="w-40 h-12 sm:w-48 sm:h-14 text-sm sm:text-base transition transform hover:scale-105 duration-300"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AIPicker;
