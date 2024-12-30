import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, children, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div
                className="bg-white p-6 rounded-lg text-center shadow-lg"
                style={{
                    width: '50%',
                    height: '80%',
                    maxWidth: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto', // Optional for scrollable content
                }}
            >
                {title && (
                    <h2
                        id="modal-title"
                        className="text-xl font-bold mb-4 text-gray-800"
                    >
                        {title}
                    </h2>
                )}
                <div className="mb-4 text-gray-700">
                    {children || <p>No content provided.</p>}
                </div>
                <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white transition duration-300 ease-in-out"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
    title: '',
    children: null,
};

export default Modal;
