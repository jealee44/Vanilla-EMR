const express = require('express');
const patientsController = require('../controllers/patientsController');
const router = express.Router();

router.get('/patients', patientsController.getPatient, (req, res) => {
    res.status(200).json(req.patients)
});

router.post('/patients', patientsController.addPatient, (req, res) => {
    res.status(200).json(req.newPatient)
});

router.post('/patients/:id/appointment', patientsController.createAppointment, (req, res) => {
    res.status(200).json(req.updatedPatient)
});

router.patch('/patients/:id/check-in-out', patientsController.updateStatus, (req, res) => {
    res.status(200).json(req.updatedPatientStatus)
});

module.exports = router;