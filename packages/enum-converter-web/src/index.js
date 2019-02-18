import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import Root from './app/components/Root/Root';
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
