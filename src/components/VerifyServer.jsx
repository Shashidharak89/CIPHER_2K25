import { useContext, useEffect } from "react";
import axios from "axios";
import SampleContext from "./contexts/SampleContext";

const VerifyServer = () => {
    const {URL}=useContext(SampleContext);
    useEffect(() => {
        const verifyServer = async () => {
            try {
                const response = await axios.get(URL+"/api/teamlatest/verifyserver");
                console.log("Verification successful");
            } catch (error) {
                console.error("Error verifying server:", error);
            }
        };

        verifyServer();
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default VerifyServer;
