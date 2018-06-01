// @flow

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import OfficeReducer from './OfficeReducer';

export default combineReducers({
    routing: routerReducer,
    OfficeReducer
});