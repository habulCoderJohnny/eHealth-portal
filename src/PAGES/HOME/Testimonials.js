import React from 'react';
import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import ReviewCard from './ReviewCard';
const Testimonials = () => {
    const reviews = [
    {
        _id: 1,
        name: 'Winson Herry',
        body: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
        location: "Califonia",
        img: people1
    },
    {
        _id: 2,
        name: 'Amelia Sedley',
        body: '',
        location: "Washington Dc",
        img: people2
    },
    {
        _id: 3,
        name: 'Elizabeth',
        body: '',
        location: "Miami University Oxford",
        img: people3
    },
]
    return (
        <section className='my-28' id='review'>
            <div className='flex justify-between'>
                <div>
                 <h4 className="text-xl text-primary font-bold">Testimonials</h4>
                 <h2 className="text-4xl pb-4 underline decoration-3 decoration-primary">What Our Patients Says</h2>
                </div>
                <div>
                    <img src={quote} className="w-24 lg:w-[192px]" alt="quote"/>
                </div>
            </div>


            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                  reviews.map(review => <ReviewCard key={review._id}review={review}></ReviewCard>)
                }

            </div>
        </section>
    );
};

export default Testimonials;