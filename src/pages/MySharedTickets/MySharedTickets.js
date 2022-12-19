import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MySharedTicketList from "../../components/MySharedTicketList/MySharedTicketList";
import TicketCreateModalForm from "../../components/UI/TicketCreateModalForm/TicketCreateModalForm";

 

const MySharedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    
    
    useEffect(()=> {
        axios.get(`/api/my-tickets/${user_id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            console.log(resp)
            setTickets(resp.data.tickets);
        })
    }, []);

    return (
        <div className="container"> 
            <TicketCreateModalForm />
            {
                tickets.length > 0
                ? <MySharedTicketList tickets={tickets} />
                : <p>Emty List</p>
            }

        </div>
    );
}

export default MySharedTickets;