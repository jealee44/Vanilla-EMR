import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Calendar = () => {
    const navigate = useNavigate();

    // Initialize calendar with 5 days and 4 timeslots per day
    const [calendar, setCalendar] = useState(
        Array(5).fill().map(() => Array(4).fill({ status: 'grey', patient: null }))
    );

    // Fetch data from the back-end to update the calendar state
    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const response = await fetch('/api/patients'); // Adjust to match your API endpoint
                const patients = await response.json();

                // Map the fetched data to the correct timeslots
                const updatedCalendar = calendar.map((day, dayIndex) =>
                    day.map((timeSlot, timeIndex) => {
                        const matchingPatient = patients.find(p => {
                            const appointmentDate = new Date(p.appointment.date);
                            return (
                                appointmentDate.getDay() === dayIndex && // Match by day
                                Math.floor(appointmentDate.getHours() * 2) === timeIndex // Match by time slot
                            );
                        });

                        return {
                            ...timeSlot,
                            patient: matchingPatient || null,
                            status: matchingPatient ? 'filled' : 'grey',
                        };
                    })
                );

                setCalendar(updatedCalendar); // Update the calendar state with the mapped data
            } catch (error) {
                console.error('Error fetching calendar data:', error);
            }
        };

        fetchCalendarData();
    }, []); // Run only once on component mount

    const handleCheckInOut = (dayIndex, timeIndex) => {
        // Handle the check-in/check-out logic
    };

    const DoubleClick = (dayIndex, timeIndex) => {
        navigate(`/form?day=${dayIndex}&timeIndex=${timeIndex}`); // Navigate to form on double-click
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="calendar-cell">Time</div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                    <div key={index} className="calendar-cell">{day}</div>
                ))}
            </div>
            {['12:00', '12:30', '1:00', '1:30'].map((time, timeIndex) => (
                <div key={time} className="calendar-row">
                    <div className="calendar-cell">{time}</div>
                    {calendar.map((day, dayIndex) => (
                        <div key={dayIndex} className={`calendar-cell ${day[timeIndex].status}`}
                             onDoubleClick={() => DoubleClick(dayIndex, timeIndex)}>
                            {day[timeIndex].patient ? (
                                <div>
                                    {`${day[timeIndex].patient.firstName} ${day[timeIndex].patient.lastName}`}
                                    {/* Add check-in/check-out dropdown */}
                                    <select onChange={() => handleCheckInOut(dayIndex, timeIndex)}>
                                        <option value="check-in">Check-In</option>
                                        <option value="check-out">Check-Out</option>
                                    </select>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Calendar;
