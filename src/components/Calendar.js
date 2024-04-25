import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Calendar = () => {
    const navigate = useNavigate();

    const [calendar, setCalendar] = useState(
        Array(5).fill().map(() => Array(4).fill({ status: 'grey', patient: null }))
    );

    const DoubleClick = (dayIndex, timeIndex) => {
        navigate(`/form?day=${dayIndex}&timeIndex=${timeIndex}`);
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
                            {day[timeIndex].patient ? `${day[timeIndex].patient.firstName} ${day[timeIndex].patient.lastName}` : ''}
                            </div>
                    ))}
                    </div>
            ))}
        </div>
    );
};

export default Calendar;