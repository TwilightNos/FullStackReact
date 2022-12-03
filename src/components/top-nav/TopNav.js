import React, {useContext, useEffect, useState} from 'react';
import Logout from "../logout/Logout";
import UserContext from "../../context/context";
import {Link} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";

const TopNav = () => {
    const usercxt = useContext(UserContext);
    const [showLogout,setShowLogout] = useState(false);
    useEffect(()=>{
        if(storageUtils.getUser()){
            setShowLogout(true)
        }
    },[storageUtils.getUser()]);

    return (
        <div>
            <Link to={'/'}>Home</Link>
            {!showLogout?null:<Logout/>}
        </div>
    );
};

export default TopNav;