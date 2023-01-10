import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import "./css/Home.css"

const API = process.env.REACT_APP_API_URL

function Home() {
    const [transactions, setTransactions] = useState([])

    const currentBalance = transactions.reduce((acc, curr) =>  acc + curr.amount, 0)

    useEffect(() => {
        axios
            .get(`${API}/transactions`)
            .then(res => setTransactions(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="home">
            <h1>Current Balance: ${currentBalance}</h1>
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
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td><Link to={`/transactions/${transaction.id}`}>{transaction.item_name.charAt(0).toUpperCase() + transaction.item_name.slice(1)}</Link></td>
                            <td>${transaction.amount}</td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    );
}

export default Home;