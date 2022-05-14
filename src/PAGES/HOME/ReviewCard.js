import React from 'react';

const ReviewCard = ({review}) => {
    return (
        <div className="card lg:max-w-lg bg-sky-200 ">
            <div className="card-body items-center text-justify">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore labore tempore incidunt voluptatem cumque quam vitae quasi quaerat at eaque.</p>
                <div className="avatar online mt-4">
                    <div className="w-24 rounded-full">
                        <img src={review.img} alt=""/>
                    </div>
                </div>
                <div className='text-center'>
                    <h4 className="text-xl">{review.name}</h4>
                    <p>{review.location}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;