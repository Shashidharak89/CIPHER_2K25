// import Register from "./Register";
// import Teams from "./Register-component/Teams";
// import TeamSelection from "./Register-component/TeamSelection";
import TeamJoin from './Register-component/TeamJoin';
import RegisterLatest from './RegisterLatest';
import TeamsLatest from './Register-component/TeamsLatest';
import './styles/RegisterSection.css';
import EventCL from './Register-component/EventCL';
// import EventCL2 from './Register-component/EventCL2';
const RegisterSection=()=>{
    return(
        <div className="register-section">

            {/* <Register/>
            <TeamSelection/>
            <Teams/> */}
            {/* <RegisterLatest/> */}
            <TeamJoin/>
            <TeamsLatest/>
            <EventCL/>
            {/* <EventCL2/> */}

        </div>
    );
};

export default RegisterSection;