import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    country: {type: String, required: true},
    province: {type: String, required: true},
    code: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    address2: {type: String},
    phone: {type: String},
    fax: {type: String},
    email: {type: String},
    primary: {type: Boolean},
    createdAt : { type: Date }
});

const Office = mongoose.model('Office', OfficeSchema);