import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({token}) => {
    const navigate = useNavigate(); 
    const  handleLogout = () => {
        const authToken = localStorage.getItem("token");
        axios.get("/api/logout", {
            headers:{
                Authorization: `Bearer ${authToken}`
            },
            xsrfHeaderName: "X-XSRF-TOKEN", 
            withCredentials: true
        }).then(resp => {
            alert("Logouted");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        })
    }

    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                {!token ? <li><NavLink to='/login'>Login</NavLink> </li>: null}
                {!token ? <li><NavLink to='/register'>Register</NavLink> </li>: null}
                {token ? <li><NavLink to='/tickets'>Tickets</NavLink> </li>: null}
                {token ? <li><NavLink to='/my-tickets'>My Tickets</NavLink> </li>: null}
                {token ? <li><button onClick={() => { handleLogout()}}>Logout</button> </li>: null}
            </ul>
        </nav>
    );
}

export default NavBar;