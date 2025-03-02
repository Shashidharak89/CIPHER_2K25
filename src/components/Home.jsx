import React from 'react';
import HeroSection from './Home-comonents/HeroSection';
import EventsSection from './Home-comonents/EventsSection';
import Register from './Register';
import TeamSelection from './Register-component/TeamSelection';
import BugSlayer from './Event-components/BugSlayer';
import Example from './Home-comonents/EventsSectioncopy';
const Home=()=>{
    return (
        <div>
            <HeroSection/>
            <EventsSection/>
            <Example/>
            {/* <Register/> */}
            {/* <BugSlayer/> */}

            {/* <TeamSelection/> */}
        </div>
    )
}

export default Home;