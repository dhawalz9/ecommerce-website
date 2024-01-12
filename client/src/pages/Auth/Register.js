import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast'
import "../../styles/authStyle.css"

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("+91");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await axios.post("/api/v1/auth/register",{name,email,password,phone,address,answer});
        if(res&&res.data.success){
          toast.success(res&&res.data.message);
          navigate("/login")
        }
        else{
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
      }
    }
    
    return (
      <Layout title={"Register"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Security question: What is your pet's name
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
