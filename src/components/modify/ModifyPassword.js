import React, {useCallback, useContext, useEffect, useState} from 'react';
import UserContext from "../../context/context";
import {customerUrl, generalUrl, sellerUrl} from "../../urls/url";
import classes from './ModifyInfo.module.css';

const ModifyPassword = () => {

    const [password,setPassword] = useState({
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:''
    });
    const usercxt = useContext(UserContext);
    const [showModifyPassword,setShowModifyPassword] = useState(true);
    useEffect(()=>{
        if(usercxt.isGoogle===true){
            setShowModifyPassword(false);
        }
    })

    const oldPasswordChangeListener = (event) =>{
        setPassword({
            ...password,
            oldPassword: event.target.value,
        })
    }
    const newPasswordChangeListener = (event) =>{
        setPassword({
            ...password,
            newPassword: event.target.value,
        })
    }
    const confirmNewPasswordChangeListener = (event) =>{
        setPassword({
            ...password,
            confirmNewPassword: event.target.value,
        })
    }

    const submitModifyPasswordHandler = async (event) => {
        event.preventDefault();
        console.log(password);
        if(password.newPassword !== password.confirmNewPassword){
            alert('Password not match!');
        } else {
            const url = usercxt.identity ? `${generalUrl}/customer` : `${generalUrl}/seller`;
            const res = await fetch(`${url}/modifyPassword`, {
                method: 'POST',
                body: JSON.stringify({
                    email: usercxt.email,
                    currPw: password.oldPassword,
                    modifiedPw: password.newPassword
                })
            });
            if (res.ok) {
                const response = await res.json();
                if(response.state !== true){
                    alert(response.message);
                } else{
                    alert('success!')
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={submitModifyPasswordHandler} className={classes.form}>
                <label htmlFor="oldPassword">old password:</label>
                <input type="password" name={'oldPassword'} onChange={oldPasswordChangeListener} required={true}/><br/>
                <label htmlFor="newPassword">new password:</label>
                <input type="password" name={'newPassword'} onChange={newPasswordChangeListener} required={true}/><br/>
                <label htmlFor="confirmNewPassword">confirm new password:</label>
                <input type="password" name={'confirmNewPassword'} onChange={confirmNewPasswordChangeListener}
                       required={true}/><br/>
                <button type={"submit"}>confirm</button>
            </form>
        </div>
    );
};

export default ModifyPassword;