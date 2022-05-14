import React from 'react';
import Banner from './Banner';
import MakeAppointment from './MakeAppointment';
import ServiceBoard from './ServiceBoard';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServiceBoard></ServiceBoard>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Home;