const Patient = require('../models/patientsModels');

const patientsController = {};

patientsController.addPatient = async (req, res, next) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        req.newPatient = savedPatient;
        return next();
    } catch(err) {
        return next({
            log: 'Error adding patient',
            status: 500,
            message: { err: 'Error adding patient' },
        });
    }
};

patientsController.getPatient = async (req, res, next) => {
    const { firstName, lastName, appointmentDate, checkedIn } = req.query
    const query = {};
    if(firstName) query.firstName = firstName;
    if(lastName) query.lastName = lastName;
    if(appointmentDate) query['appointment.date'] = new Date(appointmentDate);
    if(checkedIn !== undefined) query.checkedIn = checkedIn === 'true';

    try {
        const patients = await Patient.find(query);
        req.patients = patients
        return next();
    } catch(err) {
        return next({
            log: 'Error finding patient',
            status: 500,
            message: { err: 'Error finding patient'},
        });
    }
};

patientsController.createAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { date, duration } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            { 'appointment.date': date, 'appointment.duration': duration },
            { new: true }
        )
        req.updatedPatient = updatedPatient;
        return next();
    } catch(err) {
        return next({
            log: 'Error with appointment',
            status: 500,
            message: { err: 'Error making appointment' },
        });
    }
};

patientsController.updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { checkedIn } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            { checkedIn: checkedIn},
            { new: true }
        )
        req.updatedPatientStatus = updatedPatient;
        return next();
    } catch(err) {
        return next({
            log: 'Error check in',
            status: 500,
            message: { err: 'Error with check in'},
        });
    }
}

module.exports = patientsController;