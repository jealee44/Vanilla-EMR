import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PatientForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const day = searchParams.get('dev');
    const timeIndex = searchParams.get('timeIndex');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPatient = {
            firstName,
            lastName,
            appointment: {
                date: new Date(),
                duration: 30,
            },
        };

        await fetch('/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient),
        });

        navigate('/');
    };

    return (
        <div>
            <h2>Add New Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>FIrst Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PatientForm;