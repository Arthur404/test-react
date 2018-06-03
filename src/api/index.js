// @flow

import axios from 'axios';

export default {
    listOffices() : Object {
        return axios.get(`http://localhost:3001/office`)
    },

    createOffice(data: Object) : Object {
        return axios.post(`http://localhost:3001/office`, data)
    },

    deleteOffice(officeId: string) : Object {
        return axios.delete(`http://localhost:3001/office/${officeId}`)
    },

    updateOffice(officeId: string, data: Object) : Object {
        return axios.put(`http://localhost:3001/office/${officeId}`, data)
    }
}