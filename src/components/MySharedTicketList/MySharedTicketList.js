import axios from "axios";
import { useEffect, useState } from "react";
import MySharedTicketItem from "../MySharedTicketItem/MySharedTicketItem";

const MySharedTicketList = ({tickets}) => {
    
    return (
        <> 
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Ticket Title</th>
                        <th scope='col'>Shared By</th>
                    </tr>
                </thead> 
                <tbody>
                    {tickets.map( (ticket, index) => <MySharedTicketItem key={index} index={index} user_id={ticket.user_id}  username={ticket.username} ticketTitle={ticket.ticketTitle}  />)}
                </tbody>
            </table>
        </>
    )
} 

export default MySharedTicketList;