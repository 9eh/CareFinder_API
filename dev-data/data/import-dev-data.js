const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('./../../models/hospitalModel')

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection successful!')
});

// READ JSON FILE
const hospitals = JSON
    .parse(fs.readFileSync(`${__dirname}/hospitals-simple.json`, 'utf-8'));

// remove existing _id properties
for(let i = 0; i < hospitals.length; i++) {
    delete hospitals[i]._id;

    // insert GEO obj
    const cor = []
    cor.push(hospitals[i].location.longitude);
    cor.push(hospitals[i].location.latitude);

    hospitals[i]["location_points"] = {
        coordinates: cor
    }
    delete hospitals[i].location;

    console.log(cor)
}
// console.log(hospitals);

// IMPORT DATA INTO DB
// Run: node dev-data/data/import-dev-data.js --import
const importData = async () => {
    try {
        await Hospital.create(hospitals);
        console.log('Data successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// Run: node dev-data/data/import-dev-data.js --delete
const deleteData = async () => {
    try {
        await Hospital.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}