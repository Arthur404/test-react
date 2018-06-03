// @flow

import {
    REQUEST_OFFICE, SUCCESS_OFFICE, FAIL_OFFICE,
    CREATE_OFFICE, SUCCESS_CREATE_OFFICE, FAIL_CREATE_OFFICE,
    DELETE_OFFICE, SUCCESS_DELETE_OFFICE, FAIL_DELETE_OFFICE,
    UPDATE_OFFICE, SUCCESS_UPDATE_OFFICE, FAIL_UPDATE_OFFICE
} from '../constants/OfficeConst';

const initialState: {
    offices: [],
    fetching: boolean,
    error: any,
    onCreate: boolean
} = {
    offices: [],
    fetching: false,
    error: null,
    onCreate: false
};

export default (state: Object = initialState, action: {type: boolean, payload: Object}) : Object => {
    switch (action.type) {
        case REQUEST_OFFICE:
            return {...state, onCreate: false, fetching: true};
        case SUCCESS_OFFICE:
            return {...state, offices: action.payload, fetching: false};
        case FAIL_OFFICE:
            return {...state, error: action.payload, fetching: false};
        case CREATE_OFFICE:
            return {...state, onCreate: false, fetching: true};
        case SUCCESS_CREATE_OFFICE:
            return {...state, onCreate: true, fetching: false};
        case FAIL_CREATE_OFFICE:
            return {...state, error: action.payload, fetching: false};
        case DELETE_OFFICE:
            return {...state, fetching: true};
        case SUCCESS_DELETE_OFFICE:
            return {...state, fetching: false};
        case FAIL_DELETE_OFFICE:
            return {...state, error: action.payload, fetching: false};
        case UPDATE_OFFICE:
            return {...state, fetching: true};
        case SUCCESS_UPDATE_OFFICE:
            return {...state, fetching: false};
        case FAIL_UPDATE_OFFICE:
            return {...state, error: action.payload, fetching: false};
        default:
            return state;
    }
}