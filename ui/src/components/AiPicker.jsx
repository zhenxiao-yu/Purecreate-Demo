import React, { useEffect } from "react";

const AiPicker = ({
	activeEditorTab,
	setActiveEditorTab,
	prompt,
	setPrompt,
	generatingImg,
	handleSubmit,
}) => {
	useEffect(() => {
		//console.log("activeEditorTab ", activeEditorTab);
    if (activeEditorTab === "aipicker") {
			handleAlert();
      setActiveEditorTab(false);
		}
	}, [activeEditorTab]);

	const handleAlert = () => {
		alert("This Feature is Currently Not Available. ⚠️");
	};

	return <></>;
};

export default AiPicker;
