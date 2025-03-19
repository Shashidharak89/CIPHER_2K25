import React from 'react';
import HeroSection from './Home-comonents/HeroSection';
import EventsSection from './Home-comonents/EventsSection';
import Register from './Register';
import TeamSelection from './Register-component/TeamSelection';
import BugSlayer from './Event-components/BugSlayer';
import RegisterSection from './RegisterSection';
import RegisterLatest from './RegisterLatest';
import HeroCL from './Home-comonents/HeroCL';
// import NavbarCL from './NavbarCL';
const Home=()=>{
    return (
        <div>
            {/* <HeroSection/> */}
            <HeroCL/>
            {/* <NavbarCL/> */}
            <EventsSection/>

            <Register/>
            {/* <BugSlayer/> */}

            {/* <TeamSelection/> */}
            <RegisterLatest/>
        </div>
    )
}

export default Home;