// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import configureStore from './store/configureStore'
import App from './containers/App.js';

import './style/main.scss';

const store = configureStore();

const rootEl = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App}/>
        </Router>
    </Provider>,
    rootEl
);