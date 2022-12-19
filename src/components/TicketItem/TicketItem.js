import TicketEditModalForm from "../UI/TicketEditModalForm/TicketCreateModalForm";
import TicketShareModalForm from "../UI/TicketShareModalForm/TicketShareModalForm";

const TicketItem = ({id, index, title, body}) => {
    return(
        <tr>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>{body}</td>
            <td>
                <TicketEditModalForm id={id} title={title} body={body} />
                <button className="btn btn-danger">Delete</button>
                <TicketShareModalForm id={id} ticket={{id, title, body}} />
            </td>
        </tr>
    );
} 

export default TicketItem;