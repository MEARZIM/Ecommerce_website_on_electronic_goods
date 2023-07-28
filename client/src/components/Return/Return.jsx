import { useNavigate } from "react-router-dom";
import "./Return.scss"
import { useState } from "react";
import axios from "axios"
import { makePaymentRequest } from "../../utils/api";


const Return = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData ={
                            "Name": name,
                            "Email": email
             }

            const res = await makePaymentRequest.post("/api/returns", {
                ReturnData: formData,
            });

            alert('Your return request is submitted.');
            setName('');
            setEmail('');
            setSelectedFile(null);
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the email');
        }


    }

    return (
        <div className="wrapper">
            <h1>Welcome to our return Page</h1>
            <form onSubmit={handleSubmit}>

                <label>Name</label>
                <input type="text" value={name} name="user_name" onChange={(e) => { setName(e.target.value) }} required/>
                <label>Email</label>
                <input type="email" value={email} name="user_email" onChange={(e) => { setEmail(e.target.value) }} required/>
                <label>Message</label>
                <textarea name="message" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <label htmlFor="fileInput">Attach the ScreenShort of your conformation email:</label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => { setSelectedFile(e.target.files[0]) }}
                    accept=".pdf,.doc,.docx"
                />

                {/* button */}
                <div className="submitButton">
                    <input type="submit" value="Send" />

                </div>

            </form>
        </div>
    )
}

export default Return;