import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ({path="login"}) => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue);
        },1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname,
        })
        return () =>clearInterval(interval)
    },[count,navigate,location,path])

    return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <h1 className='Text-center'>Redirecting you in {count} sec</h1><br/>
        <div className="spinner-border" role="status">
            <div className="visually-hidden">Loading...</div>
        </div>
        </div>

    </>
  )
}

export default Spinner
