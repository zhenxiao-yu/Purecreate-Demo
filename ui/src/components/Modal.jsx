import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, children, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out animate-fadeIn"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out animate-scaleIn relative"
                style={{
                    width: '50%',
                    height: '80%',
                    maxWidth: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                }}
            >
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-full"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                {title && (
                    <h2
                        id="modal-title"
                        className="text-2xl font-bold mb-4 text-gray-800 text-left"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
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

// Keyframes for animations
const styles = `
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
}

.animate-scaleIn {
    animation: scaleIn 0.3s ease-in-out;
}
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

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
