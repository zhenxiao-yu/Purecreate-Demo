export const AIActions = ({ generatingImg, onGenerate, hasGeneratedImage }) => (
    <div className="ai-picker-actions">
        {generatingImg ? (
            <div className="ai-picker-loader">
                <div className="spinner"></div>
                <p>Generating your image...</p>
            </div>
        ) : !hasGeneratedImage ? (
            <button onClick={onGenerate} className="ai-picker-generate-button">
                Generate
            </button>
        ) : null}
    </div>
);
