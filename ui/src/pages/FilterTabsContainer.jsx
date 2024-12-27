import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideAnimation } from '../config/motion';
import { FilterTabs } from '../constants/filterTabs.js';
import Tab from '../components/Tab';
import state from '../store';

const FilterTabsContainer = () => {
    const [activeFilterTab, setActiveFilterTab] = useState({
        frontLogoShirt: true,
        backLogoShirt: true,
        frontTextShirt: true,
        backTextShirt: true,
        stylishShirt: false,
    });

    const handleActiveFilterTab = (tabName) => {
        const newState = { ...activeFilterTab, [tabName]: !activeFilterTab[tabName] };
        setActiveFilterTab(newState);

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
            default:
                break;
        }
    };

    return (
        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
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
    );
};

export default FilterTabsContainer;
