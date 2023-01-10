import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./css/TransactionDetails.css"

const API = process.env.REACT_APP_API_URL

function TransactionDetails() {
    const [transaction, setTransaction] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDelete = () => {
        axios
            .delete(`${API}/transactions/${id}`)
            .then(navigate("/transactions"))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios
            .get(`${API}/transactions/${id}`)
            .then(res => setTransaction(res.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="details">
            {
                transaction ? 
            <div className="info">
                <p><span>Date:</span> {transaction.date}</p>
                <p><span>Category:</span> {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</p>
                <p><span>Amount:</span> ${transaction.amount}</p>
                <p><span>From:</span> {transaction.from.charAt(0).toUpperCase() + transaction.from.slice(1)}</p>
            </div>
                : <p>Error</p>
            }
            <div className="buttons">
                <button><Link to="/transactions">Back</Link></button>
                <button><Link to={`/transactions/${id}/edit`}>Edit</Link></button>
                <button onClick={handleDelete}><Link to="/transactions">Delete</Link></button>
            </div>
        </div>
    );
}

export default TransactionDetails;