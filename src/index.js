import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';

const initApp = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root'),
    );
};

initApp();

