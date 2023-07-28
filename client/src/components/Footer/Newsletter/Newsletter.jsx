import "./Newsletter.scss";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import {React, useContext} from "react";
import { Context } from "../../../utils/context";

const Newsletter = () => {
    const {email, setEmail}=useContext(Context)
    return (
        <div className="newsletter-section">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text"> Sign Up for latest updates and offers</span>
                <div className="form">
                <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"/>
                    <button onClick={()=>{
                        window.alert("Thanks For Subscribe! \nPlease Continue Shopping");
                        window.scroll(0,0)
                    }}>Subscribe</button>
                </div>
                <span className="text">Will be used in accordance with our Privacy Policy</span>

                <div className="icon">
                    <FaFacebookF size={20} />
                    <FaTwitter size={20} />
                    <FaInstagram size={20} />
                    <FaLinkedin size={20} />
                </div>

            </div>
        </div>

    )
};

export default Newsletter;
