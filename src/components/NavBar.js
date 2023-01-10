import { Link } from "react-router-dom"
import "./css/NavBar.css"

function NavBar() {

    return (
        <div className="nav">
            <Link to="/transactions"><h1>Budget App</h1></Link>
            <button><Link to="/transactions/new">New Form</Link></button>
        </div>
    );
}

export default NavBar;