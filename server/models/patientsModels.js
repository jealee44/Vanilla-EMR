const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL=process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'JEPIC'
})
.then(() => console.timeLog('Connected to Mongo DB.'))
.catch(err => console.log(err));

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required : true },
    appointment: {
        date: {
            type: Date,
        },
        duration: {
            type: Number,
        },
    },
    checkedIn: { type: Boolean, default: false, },
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;