import React from 'react';
import chair from '../../assets/images/chair.png';


const Banner = () => {
    return (
        <div className="hero min-h-screen bg-banner bg-cover">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-md rounded-lg shadow-3xl" />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here!</h1>
                    <p className="py-6 justify-center">Our team is filled with experienced professionals who are all dedicated to your continued dental health. It is our mission to keep every patient educated and comfortable during their visits, and we will do everything we can to streamline your experience and leave you feeling refreshed and relaxed. Whether you’re getting a cleaning, a root canal, or simply require help understanding your insurance, we’re here for you!</p>

                </div>
            </div>
        </div>
    );
};

export default Banner;