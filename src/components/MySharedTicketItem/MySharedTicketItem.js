

const MySharedTicketItem = ({user_id, index, username, ticketTitle}) => {
    return(
        <tr>
            <td>{index + 1}</td>
            <td>{username}</td>
            <td>{ticketTitle}</td>
        </tr>
    );
} 

export default MySharedTicketItem;