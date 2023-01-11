import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./css/Home.css"

const API = process.env.REACT_APP_API_URL

function Home() {
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()

    const currentBalance = transactions.reduce((acc, curr) =>  acc + curr.amount, 0)

    useEffect(() => {
        axios
            .get(`${API}/transactions`)
            .then(res => setTransactions(res.data))
            .then(console.log(transactions))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="home">
            <h1>Current Balance: <span className={currentBalance > 0 ? "green" : "red"}>${currentBalance}</span></h1>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {
                transactions.map((transaction) => {
                    return (
                        <Link to={`/transactions/${transaction.id}`}>
                            <tr key={transaction.id} onclick={() => navigate(`/transaction/${transaction.id}`)}>
                                <td>{transaction.date_formatted}</td>
                                <td><Link to={`/transactions/${transaction.id}`}>{transaction.item_name.charAt(0).toUpperCase() + transaction.item_name.slice(1)}</Link></td>
                                <td className={transaction.amount > 0 ? "green" : "red"}>${transaction.amount}</td>
                            </tr>
                        </Link>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    );
}

export default Home;