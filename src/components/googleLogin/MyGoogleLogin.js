import React, {useContext, useEffect} from 'react';
import {GoogleLogin} from 'react-google-login';
import {gapi} from "gapi-script";
import {customerUrl, generalUrl, sellerUrl} from "../../urls/url";
import UserContext from "../../context/context";
import {useNavigate} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";


// 导入google clientID

const clientID = '211959893244-lbduhp27rkejtrpvdffqliqutgpn55bf.apps.googleusercontent.com';

const MyGoogleLogin = (props) => {

    const usercxt = useContext(UserContext);

    const navigate = useNavigate();


    useEffect(()=>{
        const initClient = () => {
            gapi.client.init({
                clientId:clientID,
                scope:''
            });
        };
        gapi.load('client:auth2',initClient);
    });

    const onSuccess = (res) => {
        // console.log('success:',res);
        const fetchData = async () => {

            const loginUrl = props.identity?`${generalUrl}/customer`:`${generalUrl}/seller`

            const resp = await fetch(`${loginUrl}/googleLogin`,{
                method:'POST',
                body:JSON.stringify({
                    email:res.profileObj.email,
                    username:res.profileObj.name,
                })
            });
            if(resp.ok){
                const response = await resp.json();
                console.log(response);
                if(response.state===true){
                    storageUtils.saveUser({
                        email:res.profileObj.email,
                        username:res.profileObj.name,
                        address:'',
                        identity:props.identity,
                        isGoogle:true,
                    })
                    usercxt.username = res.profileObj.name;
                    usercxt.email = res.profileObj.email;
                    usercxt.isGoogle=true;
                    navigate(props.identity?"/customer":"/seller")
                }
            }
        };
        fetchData();


    }
    const onFailure = (err) => {
        console.log('failed:',err);
        alert("Login Failed");
    }


    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                buttonText={'Sign in with Google'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default MyGoogleLogin;