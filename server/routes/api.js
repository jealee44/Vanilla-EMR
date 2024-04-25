const express = require('express');
const patientsController = require('../controllers/patientsController');
const router = express.Router();

router.get('/api/patients', patientsController.getPatient, (req, res) => {
    res.status(200).json(req.patients)
});

router.post('/api/patients', patientsController.addPatient, (req, res) => {
    res.status(200).json(req.newPatient)
});

router.post('/api/patients/:id/appointment', patientsController.createAppointment, (req, res) => {
    res.status(200).json(req.updatedPatient)
});

router.patch('/api/patients/:id/check-in-out', patientsController.updateStatus, (req, res) => {
    res.status(200).json(req.updatedPatientStatus)
});

module.exports = router;