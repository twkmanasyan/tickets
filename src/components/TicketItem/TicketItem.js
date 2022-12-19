import TicketEditModalForm from "../UI/TicketEditModalForm/TicketCreateModalForm";

const TicketItem = ({id, index, title, body}) => {
    return(
        <tr>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>{body}</td>
            <td>
                <TicketEditModalForm id={id} title={title} body={body} />
                <button className="btn btn-danger">Delete</button>
                <button className="btn btn-secondary">Share</button>
            </td>
        </tr>
    );
} 

export default TicketItem;