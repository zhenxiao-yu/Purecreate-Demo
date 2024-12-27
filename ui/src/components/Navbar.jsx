import React, { useState } from 'react';
import { motion } from 'framer-motion';
import state from '../store';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleOpenModal = (modalName) => {
        setActiveModal(modalName);
        console.log(`${modalName} modal opened`);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        console.log("Modal closed");
    };

    return (
        <motion.nav
            className="bg-black text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-wider">
                    Purecreate
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    <button
                        className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => state.intro = true}
                    >
                        Home
                    </button>
                    <button
                        className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('portfolio')}
                    >
                        Tutorial
                    </button>
                    <button
                        className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('services')}
                    >
                        Account
                    </button>
                    <button
                        className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('contact')}
                    >
                        Settings
                    </button>
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
                    className="md:hidden mt-4 space-y-4 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        className="block hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => state.intro = true}
                    >
                        Home
                    </button>
                    <button
                        className="block hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('portfolio')}
                    >
                        Tutorial
                    </button>
                    <button
                        className="block hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('services')}
                    >
                        Account
                    </button>
                    <button
                        className="block hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        onClick={() => handleOpenModal('contact')}
                    >
                        Settings
                    </button>
                </motion.div>
            )}

            {/* Modal Logic */}
            {activeModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    aria-hidden={!activeModal}
                >
                    <div className="bg-white p-6 rounded-lg text-center w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">{activeModal} Modal</h2>
                        <p>This is the content of the {activeModal} modal.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
