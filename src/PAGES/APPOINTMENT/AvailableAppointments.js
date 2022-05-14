import { format } from 'date-fns';
import React , { useState, useEffect } from 'react';
import AppointCard from './AppointCard';
import BookingModal from './BookingModal';


const AvailableAppointments = ({date}) => {
    const [appointment, setAppointment] = useState([]);
    const [treatment, setTreatment] = useState(null);
    useEffect(()=>{
        fetch('http://localhost:5000/service')
        .then(res=>res.json())
        .then(data=>setAppointment(data));
    },[])

    return (
        <div>
        <h1 className='text-2xl text-center mb-14'>Available Appointments on <span className='stat-value text-blue-700'>{format(date, 'PP')}</span></h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                appointment.map(appoint=><AppointCard key={appoint._id} appoint={appoint} setTreatment={setTreatment}></AppointCard>)
            }
        </div>
        {treatment && <BookingModal 
        treatment={treatment} 
        date={date}
        setTreatment={setTreatment}
        ></BookingModal>}
        </div>
    );
};
export default AvailableAppointments;
