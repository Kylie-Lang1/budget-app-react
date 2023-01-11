import { Link } from "react-router-dom"
import "./css/NavBar.css"

function NavBar() {

    return (
        <div className="nav">
            <Link to="/transactions"><h1>Budget App</h1></Link>
            <Link to="/transactions/new"><h2>Add New Transaction</h2></Link>
        </div>
    );
}

export default NavBar;