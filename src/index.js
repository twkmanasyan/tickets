import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App'; 

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

axios.defaults.baseURL = 'http://localhost:8000/'; 
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
); 