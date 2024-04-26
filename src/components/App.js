import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';
import PatientForm from './PatientForm';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div>
                <h1>JEPIC</h1>
                <Routes>
                    <Route path="/" element={<Calendar />} />  // Ensure this route exists
                    <Route path="/form" element={<PatientForm />} />  // Ensure this route exists
                </Routes>
            </div>
        </Router>
    );
};

export default App;
