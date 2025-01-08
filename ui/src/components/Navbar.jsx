import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import Modal from './Modal';
import TutorialModal from './Modals/TutorialModal';
import AccountModal from './Modals/AccountModal';
import SettingsModal from './Modals/SettingsModal';

const NavButton = ({ label, onClick }) => (
    <button
        className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={onClick}
    >
        {label}
    </button>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const snap = useSnapshot(state);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleOpenModal = (modalName) => setActiveModal(modalName);

    const handleCloseModal = () => setActiveModal(null);

    const menuItems = [
        { label: 'Home', action: () => (state.intro = true) },
        { label: 'Tutorial', action: () => handleOpenModal('Tutorial') },
        { label: 'Account', action: () => handleOpenModal('Account') },
        { label: 'Settings', action: () => handleOpenModal('Settings') },
    ];

    const renderModalContent = () => {
        switch (activeModal) {
            case 'Tutorial':
                return <TutorialModal />;
            case 'Account':
                return <AccountModal />;
            case 'Settings':
                return <SettingsModal />;
            default:
                return null;
        }
    };

    return (
        <motion.nav
            className="text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg"
            style={{ backgroundColor: snap.color }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between px-4">
                {/* Logo and Title */}
                <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                        {/*<img*/}
                        {/*    src="path-to-logo/logo.png"*/}
                        {/*    alt="Logo"*/}
                        {/*    className="w-8 h-8"*/}
                        {/*/>*/}
                        <div className="text-2xl font-extrabold tracking-wide">
                            Purecreate Designer Studio
                            {/* Version Tag */}
                            <span
                                className="text-[11px] ml-3 text-emerald-300 border border-emerald-300 rounded px-1 py-0.5 font-light">
                                V1.0.0-demo
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 ml-auto">
                    {menuItems.map((item, index) => (
                        <NavButton key={index} label={item.label} onClick={item.action} />
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    {isOpen ? '✖' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    id="mobile-menu"
                    className="md:hidden mt-4 space-y-4 px-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {menuItems.map((item, index) => (
                        <div key={index} className="text-left">
                            <NavButton label={item.label} onClick={item.action} />
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Modal Logic */}
            {activeModal && (
                <Modal
                    title={`${activeModal}`}
                    onClose={handleCloseModal}
                >
                    {renderModalContent()}
                </Modal>
            )}
        </motion.nav>
    );
};

export default Navbar;
