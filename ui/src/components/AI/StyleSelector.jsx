export const StyleSelector = ({ value, onChange, styles }) => (
    <div className="ai-picker-section">
        <label htmlFor="style" className="ai-picker-label">Select a Style</label>
        <select
            id="style"
            name="style"
            value={value}
            onChange={onChange}
            className="ai-picker-select"
            aria-label="Style Selector"
        >
            {styles.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    </div>
);
