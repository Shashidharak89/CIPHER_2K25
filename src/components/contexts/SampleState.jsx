import { useState } from "react";
import SampleContext from "./SampleContext";


export const SampleState = ({ children }) => {
    const URL = import.meta.env.VITE_URL;
    const [username,setUsername]=useState();
    const [userId,setUserId]=useState();
    const [mail,setMail]=useState();
    const [islogin,setIslogin]=useState(false);
    

    return (
        <SampleContext.Provider value={{URL,
        userId,setUserId,
        username,setUsername,
        mail,setMail,
        islogin,setIslogin
        }}>
            {children} 
        </SampleContext.Provider>
    );
};
