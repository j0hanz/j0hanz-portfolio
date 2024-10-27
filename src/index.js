import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import emailjs from 'emailjs-com';

// Initialize EmailJS with the user ID
emailjs.init(process.env.REACT_APP_USER_ID);

/* Create the root element for the React app */
const root = ReactDOM.createRoot(document.getElementById('root'));

/* Render the main App component inside the root element */
root.render(<App />);

/* Optionally logs performance metrics (e.g., page load times) */
reportWebVitals();
