import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from react-dom/client module
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import CSS styles
import { Provider } from 'react-redux'; // Import Provider from react-redux for Redux store integration
import store from './store/store'; // Import Redux store

// Render the App component into the root element using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App component with Provider to provide Redux store to all components */}
    <Provider store={store}>
      <App /> {/* Render the main App component */}
    </Provider>
  </React.StrictMode>, // Enable React Strict Mode for additional checks and warnings
);
