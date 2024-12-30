import React, { useState } from 'react';
import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
	const [style, setStyle] = useState('default');
	const [creativity, setCreativity] = useState(5);

	return (
		<div className="absolute left-full ml-3 p-4 bg-white rounded-lg shadow-md w-80 transition ease-in-out duration-300 transform hover:scale-105">
			<div className="text-center">
				<h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-800">AI Assistant</h2>
				<p className="text-gray-600 text-sm sm:text-base">
					Enter your prompt below and let AI help create something amazing!
				</p>
			</div>

			{/* Textarea for Prompt */}
			<div className="my-4">
				<label htmlFor="prompt" className="block mb-2 text-sm sm:text-base font-semibold text-gray-700">
					Your Prompt
				</label>
				<textarea
					id="prompt"
					placeholder="Ask AI..."
					rows={5}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className="w-full p-4 text-sm sm:text-base border-2 rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none shadow-inner"
					aria-label="Enter your AI prompt"
				/>
			</div>

			{/* Style Selector */}
			<div className="my-4">
				<label className="block mb-2 text-sm sm:text-base font-semibold text-gray-700">
					Choose Style
				</label>
				<select
					value={style}
					onChange={(e) => setStyle(e.target.value)}
					className="w-full p-2 text-sm sm:text-base border-2 rounded-lg bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
					aria-label="Choose AI style"
				>
					<option value="default">Default</option>
					<option value="modern">Modern</option>
					<option value="classic">Classic</option>
					<option value="abstract">Abstract</option>
				</select>
			</div>

			{/* Creativity Level Selector */}
			<div className="my-4">
				<label className="block mb-2 text-sm sm:text-base font-semibold text-gray-700">
					Creativity Level
				</label>
				<input
					type="range"
					min="1"
					max="10"
					value={creativity}
					onChange={(e) => setCreativity(e.target.value)}
					className="w-full appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<p
					className={`text-sm sm:text-base text-center font-semibold ${
						creativity > 7 ? 'text-red-500' : creativity < 4 ? 'text-green-500' : 'text-gray-600'
					}`}
				>
					Level: {creativity}
				</p>
			</div>

			{/* Action Buttons */}
			<div className="flex w-full justify-center gap-4">
				{generatingImg ? (
					<div className="w-40 h-12 sm:w-48 sm:h-14 flex items-center justify-center">
						<div className="w-6 h-6 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
					</div>
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
