import mongoose from "mongoose";

import api from '../../etc/config.json';

import '../models/Office';

const Office = mongoose.model('Office');

export function setUpConnection() {
    mongoose.connect(api.mongoURI);
}

export function listOffices() {
    return Office.find({}).sort({date: 'desc'});
}

export function createOffice(data) {
    const office = new Office({
        country: data.country,
        province: data.province,
        code: data.code,
        city: data.city,
        address: data.address,
        address2: data.address2,
        phone: data.phone,
        fax: data.fax,
        email: data.email,
        primary: data.primary,
        createdAt: new Date()
    });

    return office.save();
}

export function deleteOffice(id) {
    return Office.findById(id).remove();
}

export function updateOffice(id, data) {
    return Office.findById(id).update(data);
}