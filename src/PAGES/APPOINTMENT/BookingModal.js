import React from 'react';
import { format } from 'date-fns';
const BookingModal = ({ treatment,date }) => {
    const { name, slots } = treatment;

    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-warning btn-sm btn-circle absolute right-8 top-5">✕</label>
                    <h3 class="font-bold text-lg text-secondary text-center">Booking for {name}</h3>

                    <form className='grid grid-cols-1 gap-4 justify-items-center'>
                    <input type="text" value={format(date, 'PP')} disabled class="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    <input type="submit" value="submit" class="btn w-ful btn-warning" />
                    </form>

                    <div class="modal-action">
                        <label for="booking-modal" class="btn btn-ghost">Done</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;