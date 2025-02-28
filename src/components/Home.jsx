import React from 'react';
import HeroSection from './Home-comonents/HeroSection';
import EventsSection from './Home-comonents/EventsSection';
import Register from './Register';

const Home=()=>{
    return (
        <div>
            <HeroSection/>
            <EventsSection/>
            <Register/>
        </div>
    )
}

export default Home;