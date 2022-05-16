import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';


const BookingModal = ({ treatment, date, setTreatment }) => {
    const { _id, name, slots } = treatment;
    const [user, loading] = useAuthState(auth);
    const formattedDate = format(date, 'PP');

    const handleBooking = event=>{
        event.preventDefault();
        const slot = event.target.slot.value;
        const age = event.target.age.value;
        console.log(slot, age);

        const booking = {
            treatmentId:_id,
            treatment: name,
            date: formattedDate,
            slot,
            patientEmail: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value,
            age: event.target.age.value
        }
        //its time to Fetch for SENT data to server for line:41 
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data=> {
            toast('Booking submit successful')
            console.log(data)
        //for close modal
        setTreatment(null)
       })
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-warning btn-sm btn-circle absolute right-8 top-5">✕</label>
                    <h3 className="font-bold text-lg text-secondary text-center">Booking for {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 justify-items-center'>
                        <input type="text" value={format(date, 'PP')} disabled className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-secondary w-full max-w-xs">
                        <option disabled selected>Pick your Ideal Slots</option>
                            {
                                slots.map((slot,index)=><option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input value={user?.displayName || ''}
                        disabled type="text" name='name' className="input input-bordered w-full max-w-xs" />
                        <input value={user?.email || ''} disabled  type="email" name='email' className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Current Phone Number" className="input input-bordered w-full max-w-xs" />
                        <label>Your up-to-date Age </label>
                        <input type="number" name='age'
                        id='age' placeholder="Age" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" className="btn w-ful btn-warning" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;


