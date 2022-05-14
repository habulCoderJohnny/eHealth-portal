import Footer from '../SHARED/Footer';
import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;