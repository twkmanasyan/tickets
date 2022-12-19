import axios from 'axios';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const registerForm = useRef(null); 
    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            email:registerForm.current[0].value,
            password:registerForm.current[1].value
        };
        axios.post("/api/login", data, {
            xsrfHeaderName: "X-XSRF-TOKEN", 
            withCredentials: true
        }).then(resp => {
            if(resp.data.validation_errors) { 
                setErrors(resp.data.validation_errors);
            } else {
                const token = resp.data.token;
                const user = resp.data.user; 
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                console.log(resp.data);
                navigate("/tickets");
            }
        }); 
    }
    return (
        <> 
    <div className='container pt-4'>
        <h2>Login</h2>
        <form ref={registerForm} onSubmit={submitForm} className='w-25'>
            <div className='mb-2'>
                <label htmlFor='email'>Email</label>
                <input className='form-control' id='email' type='email' placeholder='example@gmail.com' />
                {errors.email ? <span className='text-danger'>{errors.email[0]}</span> : null}

            </div>
            <div className='mb-2'>
                <label htmlFor='email'>Password</label>
                <input className='form-control' id='password' type='password' placeholder='...' />
                {errors.password ? <span className='text-danger'>{errors.password[0]}</span> : null}

            </div>
            <Button type="submit">Login</Button>
        </form>
   </div>
        
   </>
    );
}

export default Login;