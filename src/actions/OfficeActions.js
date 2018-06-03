// @flow

import {
    REQUEST_OFFICE, SUCCESS_OFFICE, FAIL_OFFICE,
    CREATE_OFFICE, SUCCESS_CREATE_OFFICE, FAIL_CREATE_OFFICE,
    DELETE_OFFICE, SUCCESS_DELETE_OFFICE, FAIL_DELETE_OFFICE,
    UPDATE_OFFICE, SUCCESS_UPDATE_OFFICE, FAIL_UPDATE_OFFICE
} from '../constants/OfficeConst';
import api from '../api';

const OfficeActions : Object = {
    loadOffices() : Object {
        return (dispatch: Function) : void => {
            dispatch({
                type: REQUEST_OFFICE
            });

            api.listOffices()
                .then(({data}) => (
                    dispatch({
                        type: SUCCESS_OFFICE,
                        payload: data
                    })
                ))
                .catch(err => (
                    dispatch({
                        type: FAIL_OFFICE,
                        payload: err
                    })
                ));
        }
    },

    createOffice(office: Object) : Object {
        return (dispatch: Function) : void => {
            dispatch({
                type: CREATE_OFFICE
            });

            api.createOffice(office)
                .then(() => {
                    dispatch({
                        type: SUCCESS_CREATE_OFFICE
                    });
                })
                .then(()=> this.loadOffices())
                .catch(err => (
                    dispatch({
                        type: FAIL_CREATE_OFFICE,
                        payload: err
                    })
                ));
        }
    },

    deleteOffice(officeId: string) : Object {
        return (dispatch: Function) : void => {
            dispatch({
                type: DELETE_OFFICE
            });

            api.deleteOffice(officeId)
                .then(() => (
                    dispatch({
                        type: SUCCESS_DELETE_OFFICE
                    })
                ))
                .then(()=> this.loadOffices())
                .catch(err => (
                    dispatch({
                        type: FAIL_DELETE_OFFICE,
                        payload: err
                    })
                ));
        }
    },

    updateOffice(officeId: string, data: Object) : Object {
        return (dispatch: Function) : void => {
            dispatch({
                type: UPDATE_OFFICE
            });

            api.updateOffice(officeId, data)
                .then(() => (
                    dispatch({
                        type: SUCCESS_UPDATE_OFFICE
                    })
                ))
                .then(()=> this.loadOffices())
                .catch(err => (
                    dispatch({
                        type: FAIL_UPDATE_OFFICE,
                        payload: err
                    })
                ));
        }
    }
};

export default OfficeActions;