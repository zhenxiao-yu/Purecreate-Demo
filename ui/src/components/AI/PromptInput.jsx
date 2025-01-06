export const PromptInput = ({ value, onChange }) => (
    <div className="ai-picker-section">
        <label htmlFor="prompt" className="ai-picker-label">Enter Your Prompt</label>
        <textarea
            id="prompt"
            name="prompt"
            rows={5}
            value={value}
            onChange={onChange}
            placeholder="Describe what you want the AI to create..."
            className="ai-picker-textarea"
            aria-label="Prompt Input"
        />
    </div>
);
