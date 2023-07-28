import { useContext, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";
import {fetchEmailAndNumberFromApi} from "../../../utils/api";


const Login = () => {
    const {email, setEmail,phoneNumber,setphoneNumber,authenticateUserId,setAuthenticateUserId,setCartItems,setwishListItems,setName,setPassword,loginLogout, setLoginLogout,setCartCount,setCartSubTotal} = useContext(Context)


    
    const handelLoginLogout = () =>{
        if (loginLogout === "LogOut") {
            window.alert("logout Sucessfull")
            window.location.reload(true)
        }     
    }

    const validation = (e) =>{
        e.preventDefault()

        fetchEmailAndNumberFromApi(
            `/api/users?populate=*&[filters][email]=${email}&[filters][PhoneNumber]=${phoneNumber}`
        ).then((res)=>{
            // console.log(res.data);
            if (res.data.length>0) {
                window.alert(`Login SuccessFull! ${res.data[0].username}`)
                setAuthenticateUserId(res.data[0].id)
                setCartItems(res.data[0].cardItems)
                setwishListItems(res.data[0].wishListItems)
                navigate("/")
            }
            else{
                window.alert("Login UnSuccessFull")
                setEmail("")
                setphoneNumber("")
            }
        })

        
    }
    // console.log(authenticateUserId)

    const navigate = useNavigate()
    return <div className='login-register'>
        <div id="login-form-wrap">
            <h2>{loginLogout}</h2>
            <form id="login-form" onSubmit={validation}>
                <p>
                    <input type="text" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Enter your Email" required /><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="number" 
                    value={phoneNumber}
                    onChange={(e)=>{setphoneNumber(e.target.value)}}
                    placeholder="Enter your Phone Number" required /><i class="validation"><span></span><span></span></i>

                </p>
                <p>
                    <input type="submit" id="login" value={loginLogout} onClick={()=>{
                        setLoginLogout("LogOut")
                        handelLoginLogout()
                    }}/>
                </p>
            </form>
            <div id="create-account-wrap" onClick={()=>{navigate("/register")}}>
                <p >Not a member? Create Account</p>
            </div>
        </div>
    </div>

}

export default Login