import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { slideAnimation, fadeAnimation } from '../config/motion';
import Tab from '../components/Tab';
import CustomButton from '../components/CustomButton';
import TabContent from './TabContent';
import FilterTabsContainer from './FilterTabsContainer';
import { EditorTabs } from "../constants/editorTabs.js";
import Navbar from "../components/Navbar.jsx";

const Customizer = () => {
    const snap = useSnapshot(state);
    const [activeEditorTab, setActiveEditorTab] = useState("");

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    {/* Animated Navbar */}
                    <motion.div
                        className="navbar-container"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                        exit={{ y: -100, opacity: 0 }}
                    >
                        <Navbar />
                    </motion.div>

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

                    <FilterTabsContainer />
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
