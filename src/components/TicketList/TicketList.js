import TicketItem from "../TicketItem/TicketItem";
 
const TicketList = ({tickets}) => {

    
    return (
        <> 
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Body</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map( (ticket, index) => <TicketItem key={index} id={ticket.id} index={index} title={ticket.title} body={ticket.body}  />)}
                </tbody>
            </table>
        </>
    )
} 

export default TicketList;