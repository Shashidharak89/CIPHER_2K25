import React from 'react';
import HeroSection from './Home-comonents/HeroSection';
import EventsSection from './Home-comonents/EventsSection';
import Register from './Register';
import TeamSelection from './Register-component/TeamSelection';
import BugSlayer from './Event-components/BugSlayer';

const Home=()=>{
    return (
        <div>
            <HeroSection/>
            <EventsSection/>
            {/* <Register/> */}
            <BugSlayer/>

            <TeamSelection/>
        </div>
    )
}

export default Home;