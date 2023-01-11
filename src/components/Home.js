//DEPENDENCIES
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./css/Home.css"
const API = process.env.REACT_APP_API_URL

//Function fo rendering home page which shows an index of all transactions
function Home() {
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()

    //Calculates current balance
    const currentBalance = transactions.reduce((acc, curr) =>  acc + curr.amount, 0)

    //useeffect makes get request for all transacions
    useEffect(() => {
        axios
            .get(`${API}/transactions`)
            .then(res => setTransactions(res.data))
            .then(console.log(transactions))
            .catch(err => console.log(err))
    }, [])

    //React rendering of home component
    return (
        <div className="home">
            {
                //Displays the current balance in red if below $0, in yellow if between $0-1000 and in green if above $1000
                currentBalance < 0 ?
                <h1>Current Balance: <span className="red">-${Math.abs(currentBalance)}</span></h1> :
                    currentBalance > 1000 ?
                    <h1>Current Balance: <span className="green">${currentBalance}</span></h1> :
                    <h1>Current Balance: <span className="white">${currentBalance}</span></h1> 
            }
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
                    //Maps over all transactions to display data in a table
                    transactions.map((transaction) => {
                        return (
                            <Link to={`/transactions/${transaction.id}`}>
                                <tr key={transaction.id} onclick={() => navigate(`/transaction/${transaction.id}`)}>
                                    <td>{transaction.date_formatted}</td>
                                    <td><Link to={`/transactions/${transaction.id}`}>{transaction.item_name.charAt(0).toUpperCase() + transaction.item_name.slice(1)}</Link></td>
                                    {
                                        transaction.action === "withdrawal" ?
                                        <td className="red">-${Math.abs(transaction.amount)}</td> :
                                        <td className="green">${transaction.amount}</td>
                                    }
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