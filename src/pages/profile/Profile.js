import React, {useContext, useEffect, useState} from 'react';
import ModifyInfo from "../../components/modify/ModifyInfo";
import ModifyPassword from "../../components/modify/ModifyPassword";
import UserContext from "../../context/context";
import storageUtils from "../../utils/storageUtils";

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
            <ul>
                <li>email:{usercxt.email}</li>
                <li>username:{usercxt.username}</li>
                <li>address:{usercxt.address}</li>
            </ul>
            <button onClick={modifyInfoClickHandler}>Modify Information</button>
            {!storageUtils.getUser().isGoogle &&
                <button onClick={modifyPasswordClickHandler} disabled={storageUtils.getUser().isGoogle}>Modify
                    Password</button>}
            {showInfo&&<ModifyInfo/>}
            {showPw&&<ModifyPassword/>}
        </div>
    );
};

export default Profile;