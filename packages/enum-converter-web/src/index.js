import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App/App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

console.log('test');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
