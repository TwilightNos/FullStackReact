import React, {useContext, useEffect, useState} from 'react';
import {customerUrl, sellerUrl} from "../../urls/url";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import UserContext from "../../context/context";
import MyGoogleLogin from "../../components/googleLogin/MyGoogleLogin";
// login router component


const Login = (props) => {
    // navigate
    const navigate = useNavigate();
    // get params from register
    const registerData = useLocation();

    const userctx = useContext(UserContext);
    // user login information
    const [loginData,setLoginData] = useState({
        email: '',
        password:''
    });

    // true and false represents customer and seller, default customer
    const [identity,setIdentity] = useState(true);
    // function for change customer and seller
    const changeIdentityHandler = () => {
        setIdentity(prevState => !prevState);
    }
    const emailChangeHandler = (event) => {
        setLoginData({
            ...loginData,
            email: event.target.value
        })
    }
    const passwordChangeHandler = (event) => {
        setLoginData({
            ...loginData,
            password: event.target.value,
        })
    }

    // 判断用户是否已经登录，如果已经登陆自动跳转到页面
    useEffect(()=>{
        if(JSON.stringify(storageUtils.getUser())!=="{}"){
            navigate(storageUtils.getUser().identity?'/customer':'/seller')
        }
        if(registerData.state){
            setLoginData({
                email: registerData.state.email,
                password: registerData.state.password,
            })
        }
    },[navigate,registerData.state])


    const submitLogin = async (event) => {
        event.preventDefault();
        // remove current user if exits
        storageUtils.removeUser();
        const loginUrl = identity?`${customerUrl}/customer`:`${sellerUrl}/seller`;
        const res = await fetch(`${loginUrl}/login`,{
            method:"POST",
            body:JSON.stringify(loginData),
        });
        if(res.ok){
            const resp = await res.json();
            if(resp.state === true){
                storageUtils.saveUser({
                    email:loginData.email,
                    username:resp.username,
                    address:resp.address,
                    identity:identity,
                })
                const newUser = storageUtils.getUser();
                userctx.email = newUser.email;
                userctx.address = newUser.address;
                userctx.username = newUser.username;
                userctx.identity = newUser.identity;
                navigate(identity?"/customer":"/seller");
            }else{
                alert(resp.message);
            }
        }
    }
    return (
        <div>
            <header>Login</header>
            <div>
                <form onSubmit={submitLogin}>
                    <label htmlFor="email"></label>
                    <input type="text" name={"email"} onChange={emailChangeHandler} placeholder={"email"} defaultValue={loginData.email}/><br/>
                    <label htmlFor="password"></label>
                    <input type="password" name={"password"} onChange={passwordChangeHandler} placeholder={"password"} defaultValue={loginData.password}/><br/>
                    <button type={"submit"}>Login</button>
                </form>
                <Link to={'/register'}>register</Link><br/>
                <button onClick={changeIdentityHandler}>{identity?<p>Login as Seller</p>:<p>Login as Customer</p>}</button>
            </div>
            <MyGoogleLogin identity = {identity}/>
        </div>
    );
};

export default Login;