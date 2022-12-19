import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Home from './pages/Home/Home';
import axios from 'axios';
import Tickets from './pages/Tickets/Tickets';
import MySharedTickets from './pages/MySharedTickets/MySharedTickets';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000/';

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.headers.common['X-Requested-With']
//     = document.querySelector('meta[name="csrf-token"]')
//         .getAttribute('content');

function App() { 
  const [loggined, setLoggind] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("token")) {
      setLoggind(true);
    }
  });
  return (
    <div className="App">
      <NavBar token={loggined} />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/register' element={<Register /> } />
        <Route path='/tickets' element={<Tickets /> } />
        <Route path='/my-tickets' element={<MySharedTickets /> } />
      </Routes>
      
    </div>
  );
}

export default App;
