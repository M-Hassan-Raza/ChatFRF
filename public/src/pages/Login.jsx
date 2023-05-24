import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/frflogo.png'
import {Link,useNavigate} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
function Login() {

    const navigate = useNavigate();
    const [values,setValues] = useState({
        username: "",
        password: "",
    })

    const toastOptions = {

        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        }

    useEffect(()=>
    {
      if(localStorage.getItem('chat-app-user'))
      {
        navigate("/");
      }
    },[])    
    const handleSubmit  = async (event)=>
    {
        event.preventDefault();

        if(handleValidation())
        {
            const {password, username} = values;
            const {data} = await axios.post(loginRoute,
                {
                    username,
                    password,
                }); 

            if(data.status===false)
            {
                toast.error(data.msg,toastOptions);
            }    

            if(data.status === true)
            {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate("/");
            }
        }
        
    }

    const handleChange = (event)=>
    {
        setValues({...values,[event.target.name]:event.target.value});
    }

    const handleValidation = () =>
    {
        const {password, confirmPassword, username, email} = values;
        if(password === "")
        {
            toast.error("Password is Required",toastOptions);
            return false;
        }
        else if(username.length === 0)
        {
            toast.error("UserName is Reqired",toastOptions);
            return false;
        }
        return true;
    }
  return (
    <>
    <FormContainer>
        <form onSubmit = {(event)=>handleSubmit(event)}>
        <div className="brand">
            <img src= {Logo} alt={Logo} />
            <h1>ChatFRF</h1>
        </div>

        <input
         type="text"
         placeholder='UserName'
         name='username'
         min = "3"
         onChange={(e)=>handleChange(e)}/>
        

        <input
         type="password"
         placeholder='Password'
         name='password'
         onChange={(e)=>handleChange(e)}/>
 
         <button type='submit'>Login</button>
         <span>
            Don't Have an Account? <Link to="/register">Register</Link>
        </span>
        </form>
    </FormContainer>
    <ToastContainer /> 
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login