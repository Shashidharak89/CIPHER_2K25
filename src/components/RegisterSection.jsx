import Register from "./Register";
import TeamSelection from "./Register-component/TeamSelection";
import './styles/RegisterSection.css';
const RegisterSection=()=>{
    return(
        <div className="register-section">

            <Register/>
            <TeamSelection/>

        </div>
    );
};

export default RegisterSection;