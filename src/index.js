// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'babel-polyfill';
import 'whatwg-fetch'

import configureStore from './store/configureStore'
import App from './containers/App.js';

import './style/main.scss';

const store = configureStore();

// $FlowIgnoreMe WHY: document.getElementById always exists
const rootEl: HTMLElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App}/>
        </Router>
    </Provider>,
    rootEl
);