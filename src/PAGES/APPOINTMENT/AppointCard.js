import React from 'react';

const AppointCard = ({ appoint, setTreatment}) => {
    const { name, slots } = appoint;
    return (
        <div className="card lg:max-w-lg shadow-xl my-5">
            <div className="card-body text-center">
                <h2 className="card-title justify-center">{name}</h2>
                <p>{
                    slots.length>0 ? <span>{slots[0]}</span> : <span className=' text-red-500'>No Available slots</span>
                    }</p>
                <p> <span className='stat-value text-primary'>{slots.length}</span> {slots.length > 1 ? 'Spaces ' : 'Space'} available</p>
                <div className="card-actions justify-center">
                <label htmlFor="booking-modal" disabled={slots.length === 0}
                     onClick={()=>setTreatment(appoint)} className="btn btn-sm text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointCard;
