import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';

export default function configureStore() {
    const history = createHistory();
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];
    return createStore(rootReducer, composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );
}