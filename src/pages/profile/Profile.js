import React, {useContext, useEffect, useState} from 'react';
import ModifyInfo from "../../components/modify/ModifyInfo";
import ModifyPassword from "../../components/modify/ModifyPassword";
import UserContext from "../../context/context";
import storageUtils from "../../utils/storageUtils";
import classes from './profile.module.css';

const Profile = () => {
    const usercxt = useContext(UserContext);
    const [isGoogle,setIsGoogle] = useState(false);
    const [showInfo,setShowInfo] = useState(false);
    const [showPw,setShowPw] = useState(false);

    useEffect(()=>{
        if(usercxt.isGoogle===true){
            setIsGoogle(true)
        }
    })

    const modifyInfoClickHandler = () =>{
        setShowInfo(prevState => !prevState);
        setShowPw(false);
    }
    const modifyPasswordClickHandler = () =>{
        setShowPw(prevState => !prevState);
        setShowInfo(false);
    }

    return (
        <div>
            <div className={classes.profile}>
                <ul>
                    <li>email:{usercxt.email}</li>
                    <li>username:{usercxt.username}</li>
                    <li>address:{usercxt.address}</li>
                </ul>
            </div>
            <div className={classes.background}>
                <button onClick={modifyInfoClickHandler} className={classes.button}>Modify Information</button>
                {!storageUtils.getUser().isGoogle &&
                    <button className={classes.button} onClick={modifyPasswordClickHandler} disabled={storageUtils.getUser().isGoogle}>Modify
                        Password</button>}
                {showInfo&&<ModifyInfo/>}
                {showPw&&<ModifyPassword/>}
            </div>
        </div>
    );
};

export default Profile;