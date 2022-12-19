import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../../components/TicketList/TicketList";
import TicketCreateModalForm from "../../components/UI/TicketCreateModalForm/TicketCreateModalForm";

 

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    
    
    useEffect(()=> {
        axios.get("/api/tickets/", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            setTickets(resp.data.tickets);
        })
    }, []);

    return (
        <div className="container"> 
            <TicketCreateModalForm />
            {
                tickets.length > 0
                ? <TicketList tickets={tickets} />
                : <p>Emty List</p>
            }

        </div>
    );
}

export default Tickets;