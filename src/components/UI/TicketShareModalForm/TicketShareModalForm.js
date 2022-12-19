import React, { useState, useEffect, memo, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';


const TicketShareModalForm = memo(() => { 
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const [users, setUsers] = useState([]); 
    const handleShow = () => {
        setShow(true);
        axios.get(`/api/usersForShare/${user_id}`,  {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then( resp => {
            console.log(resp.data.users)
            setUsers(resp.data.users)
        })
    }; 

    const user_id = JSON.parse(localStorage.getItem("user")).id;  
    const token = localStorage.getItem("token");
    
    const formData = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id,
            ides:formData.current[0].value
        }

        console.log(data);
    }

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Share
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    <form ref={formData} className='form' onSubmit={handleSubmit}>
                        <Form.Select aria-label="Default select example"  multiple > 
                            {users.map( (user, index) => <option key={index} value={user.id}>{user.name}</option> )}
                        </Form.Select>

                        <Button type='submit' variant='primary'>Share</Button>
                    </form>
                    
                </Modal.Body>
                <Modal.Footer> 
                </Modal.Footer>
            </Modal>
        </>
    );
}, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

export default TicketShareModalForm;