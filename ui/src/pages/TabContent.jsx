import React, { useState } from 'react';
import {AiPicker, ColorPicker, FilePicker, TextureLogoPicker} from '../components';
import { texturesLogos } from '../constants/texturesLogos';
import { reader } from '../utils/helpers.js';
import state from '../store';
import LogoControls from "../components/LogoControls.jsx";
import TextControls from "../components/TextControls.jsx";
import {DecalTypes} from "../constants/decalTypes.js";

const TabContent = ({ activeEditorTab, setActiveEditorTab }) => {
    const [file, setFile] = useState("");

    const handleTextureLogoClick = (textureLogo) => {
        const { type, image } = textureLogo;
        switch (type) {
            case "texture":
                state.fullDecal = image;
                break;
            case "frontLogo":
                state.frontLogoDecal = image;
                break;
            case "backLogo":
                state.backLogoDecal = image;
                break;
            default:
                break;
        }
    };

    const readFile = (type) => {
        reader(file)
            .then((result) => {
                const { stateProperty, filterTab } = DecalTypes[type];
                state[stateProperty] = result;
                setActiveEditorTab("");
            })
            .catch((error) => console.error("Error reading file:", error));
    };

    switch (activeEditorTab) {
        case "colorpicker":
            return <ColorPicker />;
        case "filepicker":
            return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
        case "logocontrols":
            return <LogoControls />;
        case "textcontrols":
            return <TextControls />;
        case "texturelogopicker":
            return (
                <TextureLogoPicker
                    texturesLogos={texturesLogos}
                    handleTextureLogoClick={handleTextureLogoClick}
                />
            );
        case "aipicker":
            return <AiPicker
                handleDecals={handleTextureLogoClick}
            />;
        default:
            return null;
    }
};

export default TabContent;