import React from 'react';

const BookingModal = ({ treatment }) => {
    const { name, slots } = treatment;

    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-warning btn-sm btn-circle absolute right-8 top-5">✕</label>
                    <h3 class="font-bold text-lg text-secondary text-center">Booking for {name}</h3>

                    <div class="modal-action">
                        <label for="booking-modal" class="btn btn-ghost">Done</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;