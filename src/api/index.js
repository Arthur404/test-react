// @flow

export default {
    listOffices() : Object {
        return fetch(`http://localhost:3001/office`)
            .then(res => res.json())
            .catch(err => err)
    },

    createOffice(data: Object) : Object {
        return fetch(`http://localhost:3001/office`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .catch(err => err)
    },

    deleteOffice(officeId: string) : Object {
        return fetch(`http://localhost:3001/office/${officeId}`, {
            method: 'delete',
        })
            .then(res => res.json())
            .catch(err => err)
    },

    updateOffice(officeId: string, data: Object) : Object {
        return fetch(`http://localhost:3001/office/${officeId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .catch(err => err)
    }
}