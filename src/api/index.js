import axios from 'axios';

export default {
    listOffices() {
        return axios.get(`http://localhost:3001/office`)
    },

    createOffice(data) {
        return axios.post(`http://localhost:3001/office`, data)
    },

    deleteOffice(officeId) {
        return axios.delete(`http://localhost:3001/office/${officeId}`)
    },

    updateOffice(officeId, data) {
        return axios.put(`http://localhost:3001/office/${officeId}`, data)
    }
}