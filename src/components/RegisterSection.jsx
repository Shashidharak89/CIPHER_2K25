// import Register from "./Register";
// import Teams from "./Register-component/Teams";
// import TeamSelection from "./Register-component/TeamSelection";
import TeamJoin from './Register-component/TeamJoin';
import RegisterLatest from './RegisterLatest';
import TeamsLatest from './Register-component/TeamsLatest';
import './styles/RegisterSection.css';
const RegisterSection=()=>{
    return(
        <div className="register-section">

            {/* <Register/>
            <TeamSelection/>
            <Teams/> */}
            <RegisterLatest/>
            <TeamJoin/>
            <TeamsLatest/>

        </div>
    );
};

export default RegisterSection;