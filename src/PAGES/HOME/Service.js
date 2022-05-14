import React from 'react';
import CustomBtn from '../SHARED/CustomBtn';

const Service = ({content}) => {
    const {name, describe, img} = content;

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt=".." className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{describe}</p>
                <div className="card-actions">
                <CustomBtn>get the service</CustomBtn>
                </div>
            </div>
        </div>
    );
};

export default Service;
