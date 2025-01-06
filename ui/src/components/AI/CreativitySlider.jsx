export const CreativitySlider = ({ value, onChange }) => (
    <div className="ai-picker-section">
        <label htmlFor="creativity" className="ai-picker-label">Creativity Level</label>
        <input
            id="creativity"
            name="creativity"
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={onChange}
            className="ai-picker-slider"
            aria-label="Creativity Level"
        />
        <span className="ai-picker-creativity-value">
      Level: {value}{" "}
            {value < 4 ? "(Low)" : value > 7 ? "(High)" : "(Medium)"}
    </span>
    </div>
);
