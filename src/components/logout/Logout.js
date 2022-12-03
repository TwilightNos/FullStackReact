import React from 'react';
import {useNavigate} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";

const Logout = () => {
    const navigate = useNavigate();
    const logoutHandler = () =>{
        storageUtils.removeUser();
        navigate('/login');
    }
    return (
        <div>
            <button onClick={logoutHandler}>logout</button>
        </div>
    );
};

export default Logout;