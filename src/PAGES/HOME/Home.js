import React from 'react';
import Banner from './Banner';
import ServiceBoard from './ServiceBoard';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServiceBoard></ServiceBoard>
            <Services></Services>
        </div>
    );
};

export default Home;