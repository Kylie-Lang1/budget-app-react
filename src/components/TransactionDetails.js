//DEPENDENCIES
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./css/TransactionDetails.css"
const API = process.env.REACT_APP_API_URL

//Function to render details for individual transaction
function TransactionDetails() {
    //Destructuring useState and useParams variables
    const [transaction, setTransaction] = useState()
    const { id } = useParams() 
    const navigate = useNavigate() 

    //Function makes a delete request for the transaction and navigates to index page
    const handleDelete = () => {
        axios
            .delete(`${API}/transactions/${id}`)
            .then(navigate("/transactions"))
            .catch(err => console.log(err))
    }

    //useEffect makes a get request to set state with individual transaction data
    useEffect(() => {
        axios
            .get(`${API}/transactions/${id}`)
            .then(res => setTransaction(res.data))
            .catch(err => console.log(err))
    }, [id, navigate])

    //React rendering of TransactionDetails page
    return (
        <div className="details">
            <div className="container">
                {
                    //Ternary to display details if transaction ID is found
                    transaction ? 
                
                    <div className="info">
                        <p><span>Date:</span> {transaction.date_formatted}</p>
                        <p><span>Name:</span> {transaction.item_name.charAt(0).toUpperCase() + transaction.item_name.slice(1).toLowerCase()}</p>
                        <p><span>Amount:</span> ${transaction.amount}</p>
                        <p><span>Action:</span> {transaction.action.charAt(0).toUpperCase() + transaction.action.slice(1)}</p>
                        <p><span>From:</span> {transaction.from.charAt(0).toUpperCase() + transaction.from.slice(1).toLowerCase()}</p>
                        <p><span>Category:</span> {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</p>
                    </div> :

                    <p>Error</p>
                }
                <div className="buttons">
                    <Link to="/transactions"><button>Back</button></Link>
                    <Link to={`/transactions/${id}/edit`}><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default TransactionDetails;