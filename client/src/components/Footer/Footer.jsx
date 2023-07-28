import React from "react";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa"
import Payment from "../../assets/payments.png"
import "./Footer.scss";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">About</div>
                    <span className="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde obcaecati
                        repellendus possimus dolor magni dolorem illum assumenda non optio repellat architecto est,
                        cumque asperiores quos, dignissimos iure tempore. Recusandae, ex!
                    </span>
                </div>
                <div className="col">
                    <div className="title">Contacts</div>
                    <div className="c-item">
                        <FaLocationArrow />
                        <span className="text">22,North Basudepbur Madhapally Kolkata-700056</span>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <span className="text">Phone : 7003451249</span>
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <span className="text">Email : asahaayan@gmail.com</span>
                    </div>

                </div>
                <div className="col">
                    <div className="title">Categories</div>
                    <span className="text">Headphone</span>
                    <span className="text">Smart Watch</span>
                    <span className="text">Bluetooth Speaker</span>
                    <span className="text">Home Theaters</span>
                    <span className="text">Projectors</span>
                </div>
                <div className="col">
                    <div className="title">Pages</div>
                    <span className="text">Home</span>
                    <span className="text">About</span>
                    <span className="text">Privacy Policy</span>
                    <span className="text">Return</span>
                    <span className="text">Terms & conditons</span>
                    <span className="text">Contact Us</span>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="bottom-bar-content">
                    <div className="text">
                        Created by: Ayan Saha 
                    </div>
                    <img src={Payment} alt="" secSet="" />
                </div>
            </div>
        </div>
    )

};

export default Footer;
