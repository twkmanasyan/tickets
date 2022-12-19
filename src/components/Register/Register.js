import axios from 'axios';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navifate = useNavigate();
    const [errors, setErrors] = useState([]);
    const registerForm = useRef(null);
    console.log(errors);
    const submitForm = (e) => {
        e.preventDefault();
        const data = {
            name:registerForm.current[0].value,
            email:registerForm.current[1].value,
            password:registerForm.current[2].value
        };
        axios.post("/api/register", data, {
            xsrfHeaderName: "X-XSRF-TOKEN", 
            withCredentials: true
        }).then(resp => {
            if(resp.data.validation_errors) { 
                setErrors(resp.data.validation_errors);
            } else {
                console.log(resp.data)
            }
        }); 
    }


   return(<> 
    <div className='container pt-4'>
        <h2>Register</h2>
        <form ref={registerForm} onSubmit={submitForm} className='w-25'>
            <div className='mb-2'>
                <label htmlFor='name'>Full Name</label>
                <input className='form-control' id='name' type='text' placeholder='John Smith' />
                {errors.name ? <span className='text-danger'>{errors.name[0]}</span> : null}
            </div>
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
            <Button type="submit">Register</Button>
        </form>
   </div>
        
   </>);
}

export default Register;