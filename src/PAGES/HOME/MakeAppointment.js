import React from 'react';
import doctor from '../../assets/images/doctor.png';
import appointment from '../../assets/images/appointment.png';
import CustomBtn from '../SHARED/CustomBtn';

const MakeAppointment = () => {
    return (
        <section className='flex justify-center items-center my-24' style={{background: `url(${appointment})`}} id='appointment'>
            <div className='flex-1 hidden lg:block'>
             <img className='mt-[-100px]' src={doctor} alt=""/>
            </div>
            <div className='flex-1 text-white px-6'>
                <h3 className='text-2xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-4xl py-5'>Make an Appointment Today</h2>
                <p className="py-3 pb-4">To schedule an appointment by phone call To schedule online, current patients can log into MyChart or create an account if you don’t have one. If you are a new patient, please use our easy online scheduling portal.</p>
                <CustomBtn>Get Started</CustomBtn>
            </div>
            
        </section>
    );
};

export default MakeAppointment;