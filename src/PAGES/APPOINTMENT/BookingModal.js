import React from 'react';
import { format } from 'date-fns';


const BookingModal = ({ treatment, date, setTreatment }) => {
    const { _id, name, slots } = treatment;

    const handleBooking = event=>{
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(slot);
        setTreatment(null)

    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-warning btn-sm btn-circle absolute right-8 top-5">✕</label>
                    <h3 class="font-bold text-lg text-secondary text-center">Booking for {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 justify-items-center'>
                        <input type="text" value={format(date, 'PP')} disabled class="input input-bordered w-full max-w-xs" />
                        <select name='slot' class="select select-secondary w-full max-w-xs">
                        <option disabled selected>Pick your Ideal Slots</option>
                            {
                                slots.map(slot=><option value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' placeholder="Your name" class="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' placeholder="email Address" class="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone Number" class="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" class="btn w-ful btn-warning" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
