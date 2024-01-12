import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyle.css";

const ForgotPassword = () =>{
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("/api/v1/auth/forgot-password", {
            email,
            newPassword,
            answer
        });
        if(res && res.data.success) {
            toast.success(res && res.data.message);
            navigate("/login");
        } else {
            toast.error(res.data.message);
        }
        } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        }
    };

    return(
        <Layout title={"forgot password"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h1>RESET PASSWORD</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                    </label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Security answer
                    </label>
                    <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                    New Password
                    </label>
                    <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    RESET
                </button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword