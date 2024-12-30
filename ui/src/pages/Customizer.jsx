import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { slideAnimation } from '../config/motion';
import Tab from '../components/Tab';
import TabContent from './TabContent';
import FilterTabsContainer from './FilterTabsContainer';
import { EditorTabs } from '../constants/editorTabs.js';
import Navbar from '../components/Navbar.jsx';

const tooltipStyles = {
    position: 'absolute',
    transform: 'translateY(-50%)',
    padding: '8px 12px',
    background: '#333',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease-in-out',
};

const Customizer = React.memo(() => {
    const snap = useSnapshot(state);
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

    const handleMouseEnter = useCallback((e, tabName) => {
        const rect = e.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            text: tabName,
            x: rect.right + 10,
            y: rect.top + rect.height / 2,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTooltip({ visible: false, text: '', x: 0, y: 0 });
    }, []);

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    {/* Animated Navbar */}
                    <motion.div
                        className="navbar-container"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                        exit={{ y: -100, opacity: 0 }}
                    >
                        <Navbar />
                    </motion.div>

                    {/* Main Editor Tabs */}
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <div
                                        key={tab.name}
                                        onMouseEnter={(e) => handleMouseEnter(e, tab.nickname)}
                                        onMouseLeave={handleMouseLeave}
                                        className="relative"
                                    >
                                        <Tab
                                            tab={tab}
                                            handleClick={() => setActiveEditorTab(tab.name)}
                                        />
                                    </div>
                                ))}
                                <TabContent
                                    activeEditorTab={activeEditorTab}
                                    setActiveEditorTab={setActiveEditorTab}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Tooltip */}
                    {tooltip.visible && (
                        <div
                            className="tooltip"
                            style={{
                                ...tooltipStyles,
                                top: tooltip.y,
                                left: tooltip.x,
                            }}
                        >
                            {tooltip.text}
                        </div>
                    )}

                    {/* Filter Tabs */}
                    <FilterTabsContainer />
                </>
            )}
        </AnimatePresence>
    );
});

export default Customizer;
