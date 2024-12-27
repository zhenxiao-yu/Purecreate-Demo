import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { slideAnimation, fadeAnimation } from '../config/motion';
import Tab from '../components/Tab';
import CustomButton from '../components/CustomButton';
import TabContent from './TabContent';
import FilterTabsContainer from './FilterTabsContainer';
import {EditorTabs} from "../constants/editorTabs.js";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [activeEditorTab, setActiveEditorTab] = useState("");

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
                    <TabContent
                        activeEditorTab={activeEditorTab}
                        setActiveEditorTab={setActiveEditorTab}
                    />
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
                    handleClick={() => (state.intro = true)}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              </motion.div>

              <FilterTabsContainer />
            </>
        )}
      </AnimatePresence>
  );
};

export default Customizer;
