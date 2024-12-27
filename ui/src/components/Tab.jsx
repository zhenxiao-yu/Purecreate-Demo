import React from 'react';
import { useSnapshot } from 'valtio';
import PropTypes from 'prop-types';

import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.8 }
      : { backgroundColor: "transparent", opacity: 1 };

  const getClassName = () => `
    tab-btn
    ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-lg shadow-md'}
    hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    transition-all duration-300 ease-in-out
  `;

  return (
      <button
          key={tab.name}
          className={getClassName()}
          onClick={handleClick}
          style={activeStyles}
          aria-label={`Tab for ${tab.name}`}
          role="tab"
          aria-selected={isActiveTab}
      >
        <img
            src={tab.icon}
            alt={tab.name}
            className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
        />
      </button>
  );
};

// PropTypes for type checking
Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  isFilterTab: PropTypes.bool,
  isActiveTab: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  isFilterTab: false,
  isActiveTab: false,
};

export default Tab;
