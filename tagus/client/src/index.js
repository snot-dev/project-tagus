import React from 'react';
import ReactDOM from 'react-dom';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/bootstrap-theme.min.css';
import './vendor/font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './scenes/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
