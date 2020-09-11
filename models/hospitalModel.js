const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    _address: {
        type: String,
    },
    provider_id: {
        type: String
    },
    hospital_name: {
        type: String,
        required: [true, 'A hospital must have a name'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'A hospital must have a address'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'A hospital must have a city'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'A hospital must have a state'],
        trim: true
    },
    zip_code: {
        type: Number,
        required: [true, 'A hospital must have a zip code'],
    },
    county_name: {
        type: String,
        required: [true, 'A hospital must have a county name'],
        trim: true
    },
    phone_number: {
        phone_number: {
            type: String,
            trim: true
        }
    },
    hospital_type: {
        type: String,
        required: [true, 'A hospital must specify a type'],
        trim: true
    },
    hospital_ownership: {
        type: String,
        trim: true
    },
    emergency_services: {
        type: Boolean
    },
    location_points: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type:[Number],
            required: [true, 'A hospital must specify a location coordinates'],
            index: "2dsphere"
        },
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;