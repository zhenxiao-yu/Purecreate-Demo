import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import LogoControls from '../canvas/LogoControls';
import TextControls from '../canvas/TextControls';
import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs } from "../constants/editorTabs";
import { FilterTabs } from "../constants/filterTabs";
import { DecalTypes } from "../constants/decalTypes";
import { texturesLogos } from "../constants/texturesLogos";
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, TextureLogoPicker, Tab } from '../components';

const Customizer = () => {
  // 使用 Valtio 的 useSnapshot 钩子来监听状态变化
  const snap = useSnapshot(state);

  // 保存选中的文件
  const [file, setFile] = useState('');

  // 当前激活的编辑器选项卡
  const [activeEditorTab, setActiveEditorTab] = useState("");

  // 当前激活的过滤选项卡状态
  const [activeFilterTab, setActiveFilterTab] = useState({
    frontLogoShirt: true,
    backLogoShirt: true,
    frontTextShirt: true,
    backTextShirt: true,
    stylishShirt: false,
  });

  // 根据当前激活的编辑器选项卡生成内容
  const generateTabContent = () => {
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
      default:
        return null;
    }
  };

  // 处理纹理或标志的点击事件
  const handleTextureLogoClick = (textureLogo) => {
    const { type, image } = textureLogo;
    switch (type) {
      case "texture":
        // 更新全局纹理
        state.fullDecal = image;
        break;
      case "frontLogo":
        // 更新前面的标志
        state.frontLogoDecal = image;
        break;
      case "backLogo":
        // 更新背面的标志
        state.backLogoDecal = image;
        break;
    }
  };

  // 处理贴花（decals）逻辑
  const handleDecals = (type, result) => {
    const { stateProperty, filterTab } = DecalTypes[type];
    // 更新状态中的贴花属性
    state[stateProperty] = result;
    // 如果当前过滤选项卡未激活，则激活它
    if (!activeFilterTab[filterTab]) {
      handleActiveFilterTab(filterTab);
    }
  };

  // 处理过滤选项卡的激活状态
  const handleActiveFilterTab = (tabName) => {
    // 创建一个新的状态对象，切换指定选项卡的状态
    const newState = {
      ...activeFilterTab,
      [tabName]: !activeFilterTab[tabName]
    };

    // 更新过滤选项卡状态
    setActiveFilterTab(newState);

    // 根据选项卡名称更新不同的状态属性
    switch (tabName) {
      case "frontLogoShirt":
        state.isFrontLogoTexture = newState[tabName];
        break;
      case "backLogoShirt":
        state.isBackLogoTexture = newState[tabName];
        break;
      case "frontTextShirt":
        state.isFrontText = newState[tabName];
        break;
      case "backTextShirt":
        state.isBackText = newState[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = newState[tabName];
        break;
      case "downloadShirt":
        // 下载设计
        downloadCanvasToImage();
        break;
      default:
        // 默认情况下，所有选项卡激活，除了“stylishShirt”
        state.isFrontLogoTexture = true;
        state.isBackLogoTexture = true;
        state.isFrontText = true;
        state.isBackText = true;
        state.isFullTexture = false;
    }
  };

  // 读取文件并更新贴花
  const readFile = (type) => {
    reader(file)
        .then((result) => {
          handleDecals(type, result);
          setActiveEditorTab("");
        })
        .catch((error) => {
          console.error('读取文件时发生错误:', error);
        });
  };

  return (
      <AnimatePresence>
        {!snap.intro && (
            <>
              <motion.div
                  key="custom"
                  className="absolute top-0 left-0 z-10"
                  {...slideAnimation('left')}
              >
                <div className="flex items-center min-h-screen">
                  <div className="editortabs-container tabs">
                    {EditorTabs.map((tab) => (
                        <Tab
                            key={tab.name}
                            tab={tab}
                            handleClick={() => setActiveEditorTab(tab.name)}
                        />
                    ))}
                    {generateTabContent()}
                  </div>
                </div>
              </motion.div>

              <motion.div
                  className="absolute z-10 top-5 right-5"
                  {...fadeAnimation}
              >
                <CustomButton
                    type="filled"
                    title="Back"
                    handleClick={() => state.intro = true}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              </motion.div>

              <motion.div
                  className='filtertabs-container'
                  {...slideAnimation("up")}
              >
                {FilterTabs.map((tab) => (
                    <Tab
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                ))}
              </motion.div>
            </>
        )}
      </AnimatePresence>
  );
};

export default Customizer;