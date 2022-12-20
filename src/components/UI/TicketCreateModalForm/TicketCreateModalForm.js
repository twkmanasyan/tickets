import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';


const TicketCreateModalForm = () => { 
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user_id = JSON.parse(localStorage.getItem("user")).id;
    

    const validationSchema = yup.object().shape({
        title: yup.string().typeError("Please enter only alpha characters.").required("The name is required."),
        body: yup.string().required("The body is required."),
    });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create New Ticket
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            title:'',
                            body:''
                        }}

                        validationSchema={validationSchema}

                        onSubmit={ (values, resetForm) => {
                            values.user_id = user_id;
                            const token = localStorage.getItem("token");
                            console.log(values);
                                if(load) {
                                    axios.post(`/api/tickets/store`, values, {
                                        headers:{
                                            Authorization: `Bearer ${token}`
                                        },
                                        xsrfHeaderName: "X-XSRF-TOKEN", 
                                        withCredentials: true
                                    }).then( resp => {
                                        console.log(resp);
                                        setLoad(true);
                                        setShow(false)
                                        
                                    })
                                }
                                 
                            resetForm();
                        }}

                        validateOnBlur
                    >
                        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => 
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="ticket-name">
                                    <Form.Label>Ticket Title</Form.Label>
                                    <Form.Control 
                                        name={`title`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title} 
                                        type="text" 
                                        placeholder="Ticket Title" 
                                    />
                                    <Form.Text className="text-muted">
                                        {touched.title && errors.title && <p className="text-danger">{errors.title}</p>}
                                    </Form.Text>

                                    <Form.Group className="mb-3" controlId="ticket-body">
                                        <Form.Label>Ticket Body</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Ticket Body" 
                                            name={`body`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.body} 
                                        />
                                        <Form.Text className="text-muted">
                                            {touched.body && errors.body && <p className="text-danger">{errors.body}</p>}
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Group>

                                <Button variant="primary" disabled={!isValid && !dirty} type="submit">
                                    Save
                                </Button>
                            </Form>
                        }

                    </Formik>
                </Modal.Body>
                <Modal.Footer> 
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TicketCreateModalForm;