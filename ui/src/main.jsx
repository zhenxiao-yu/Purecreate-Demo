import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './theme/index.css';
import './theme/normalize.css'
// import { Analytics } from '@vercel/analytics/react';

// Create the root for React application and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        {/*<Analytics mode={'production'} />*/}
    </React.StrictMode>
);