import "./register.css"
import { useState } from 'react';
import {sendDataFormApi} from "../../../utils/api"
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";
import { useContext } from "react";


const Register = () => {
    const {email, setEmail,password, setPassword, name, setName,phoneNumber, setphoneNumber} = useContext(Context)
    const navigate = useNavigate();

    
    const sendDataToDatabase = (e) =>{
        e.preventDefault()

        const data = {
            "username": name,
            "email": email,
            "password": password,
            "provider": "local",
            "PhoneNumber": phoneNumber,
            "confirmed": true,
            "blocked": false,
            "cardItems": [],
            "wishListItems": [],
            "role": {
                "connect": [{
                "id": 2,
                "name": "Public",
                "description": "Default role given to authenticated user.",
                "type": "public"
                }]
            }
        
        };
        
        sendDataFormApi(`/api/users`, data).then((res)=>{
            console.log(res)
            if (res === 201) {
                window.alert("Account Created Successfully")
            }else{
                window.alert("Email Already Exists")
                setEmail("")
                setName("")
                setPassword("")
                setphoneNumber()
                navigate("/")
            }
        })        
    }

    return <div className='login-register'>
        <div id="login-form-wrap">
            <h2>Register</h2>
            <form id="login-form" onSubmit={sendDataToDatabase}>
                <p>
                    <input type="text" 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder="Enter your name" required /><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="email" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Enter your Email Address" required /><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="password" 
                    minLength="6"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Enter your password" required/>
                </p>
                <p>
                    <input type="number" 
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e)=>{setphoneNumber(e.target.value)}}
                    placeholder="Enter your Phone number" required/>
                </p>
                <p>
                    <input type="submit" id="login" value="Create Account" />
                </p>
            </form>
            <div id="create-account-wrap">
                <p>Register Yourself</p>
            </div>
        </div>
    </div>

}

export default Register