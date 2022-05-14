import React from 'react';
import Banner from './Banner';
import MakeAppointment from './MakeAppointment';
import ServiceBoard from './ServiceBoard';
import Services from './Services';
import Testimonials from './Testimonials';
import Treatment from './Treatment';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServiceBoard></ServiceBoard>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Treatment></Treatment>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;