import React, {useState} from 'react';
import {json, Link, useNavigate} from "react-router-dom";
import {customerUrl, generalUrl, sellerUrl} from "../../urls/url";

const Register = () => {
    // 重定向页面
    const navigate = useNavigate();
    // state存储表单项内容
    const [registerForm,setRegisterForm] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        email:'',
        address:'',
        zipcode:0
    });
    // state存储当前身份, true = customer, false = seller
    const [identity,setIdentity] = useState(true);
    const changeIdentityHandler =()=>{
        setIdentity(prevState => !prevState);
    }

    const usernameChangeHandler = (event) => {
        setRegisterForm({
            ...registerForm,
            username: event.target.value,
        })
    }
    const emailChangeHandler = (event) =>{
        setRegisterForm({
            ...registerForm,
            email: event.target.value,
        })
    }
    const passwordChangeHandler = (event) => {
        setRegisterForm({
            ...registerForm,
            password: event.target.value,
        })
    }
    const confirmPasswordChangeHandler = (event) =>{
        setRegisterForm({
            ...registerForm,
            confirmPassword: event.target.value,
        })
    }
    const addressChangeHandler = (event) =>{
        setRegisterForm({
            ...registerForm,
            address: event.target.value,
        })
    }

    const zipcodeChangeHandler = (event) =>{
        setRegisterForm({
            ...registerForm,
            zipcode:event.target.value
        })
    }


    const submitRegisterForm = async (event) => {
        event.preventDefault();

        // 先进行初步验证
        if(registerForm.password!==registerForm.confirmPassword){
            alert('Password not match');
            return;
        }

        const registerUrl = identity?`${generalUrl}/customer`:`${generalUrl}/seller`
        const res = await fetch(`${registerUrl}/register`,{
            method:'POST',
            body:JSON.stringify({
                username:registerForm.username,
                password:registerForm.password,
                email:registerForm.email,
                address:registerForm.address,
                zipcode:registerForm.zipcode,
            }),
        });
        if(res.ok){
            const response = await res.json();
            if(response.state === false){
                alert(response.message);
            }else{
                alert(response.message);
                navigate('/login',{
                    state: {
                        email: registerForm.email,
                        password: registerForm.password
                    },
                    replace:true
                })
            }
        }
    }

    return (
        <div>
            <form onSubmit={submitRegisterForm}>
                <div>
                    <label htmlFor="email"></label>
                    <input type="email" name={'email'} placeholder={'email'} onChange={emailChangeHandler} required={true}/><br/>
                </div>
                <div>
                    <label htmlFor="username"></label>
                    <input type="text" name={'username'} placeholder={'username'} onChange={usernameChangeHandler} required={true}/><br/>
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input type="password" name={'password'} placeholder={'password'} onChange={passwordChangeHandler} required={true}/><br/>
                </div>
                <div>
                    <label htmlFor="confirmPassword"></label>
                    <input type="password" name={'confirmPassword'} placeholder={'confirm password'} onChange={confirmPasswordChangeHandler} required={true}/><br/>
                </div>
                <div>
                    <label htmlFor="address"></label>
                    <input type="text" name={'address'} placeholder={'address'} onChange={addressChangeHandler} required={true}/><br/>
                </div>
                <div>
                    <label htmlFor="zipcode"></label>
                    <input type="text" name={'zipcode'} placeholder={'zipcode'} onChange={zipcodeChangeHandler} required={true}/>
                </div>
                <button type={"submit"}>Register</button>
            </form>
            <Link to={'/login'}>Login</Link><br/>
            <button onClick={changeIdentityHandler}>{identity?<p>Register as Seller</p>:<p>Register as Customer</p>}</button>
        </div>
    );
};

export default Register;