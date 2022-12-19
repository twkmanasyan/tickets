

const MySharedTicketItem = ({user_id, index, username, ticketTitle}) => { 
    return(
        <tr>
            <td>{index + 1}</td>
            <td>{ticketTitle}</td>
            <td>{username}</td>
        </tr>
    );
} 

export default MySharedTicketItem;