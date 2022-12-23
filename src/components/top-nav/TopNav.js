import React, {useContext, useEffect, useState} from 'react';
import Logout from "../logout/Logout";
import UserContext from "../../context/context";
import {Link} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import classes from './TopNav.module.css'

const TopNav = () => {
    const usercxt = useContext(UserContext);
    const [showLogout,setShowLogout] = useState(false);
    useEffect(()=>{
        if(storageUtils.getUser()){
            setShowLogout(true)
        }
    },[storageUtils.getUser()]);

    return (
        <div className={classes.out}>
            <div className={classes.home}><Link to={'/'}>Home</Link></div>
            <div className={classes.logout}>{!showLogout?null:<Logout/>}</div>
        </div>
    );
};

export default TopNav;