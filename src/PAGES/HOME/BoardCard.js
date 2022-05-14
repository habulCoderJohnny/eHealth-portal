import React from 'react';

const BoardCard = ({img, cardTitle, titleDetail, bgClass}) => {
    return (
        <div className= {`card lg:card-side bg-base-100 shadow-xl ${bgClass}`}>
            <figure className='pl-5 pt-5'>
                <img src={img} alt="card-img" />
            </figure>
            <div className="card-body text-white">
                <h2 className="card-title">{cardTitle}</h2>
                <p className='font-bold hover:underline'>{titleDetail}</p>
            </div>
        </div>
    );
};

export default BoardCard;