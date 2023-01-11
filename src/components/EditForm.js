import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./css/EditForm.css"

function EditForm() {
    const [transaction, setTransaction] = useState({})
    const [date, setDate] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
    const API = process.env.REACT_APP_API_URL

    const handleTextChange = (e) => {
        if(e.target.id === "amount"){
            setTransaction({...transaction, [e.target.id]: Number(e.target.value)})
        } else {
            setTransaction({...transaction, [e.target.id]:e.target.value})
        }
        console.log(transaction)
    }

    const handleSelect = (e) => {
        setTransaction({...transaction, [e.target.id]: e.target.value})
    }

    const handleDate = (date) => {
        const dateString = date.toLocaleDateString()
        const date_formatted = dateString.slice(0, dateString.length - 4) + dateString.slice(dateString.length-2)

        setDate(date)
        setTransaction({...transaction, date, date_formatted})
        console.log(date)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .put(`${API}/transactions/${id}`, transaction)
            .then(() => navigate(`/transactions/${id}`))
            .catch(err => console.log(err))
    }

    useEffect (() => {
        axios
            .get(`${API}/transactions/${id}`)
            .then(res => {
                setTransaction(res.data)
                setDate(Date.parse(res.data.date))
                console.log(Date.parse(res.data.date))
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="edit">
            <p>Make edits to an existing transaction below.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date: 
                    <Datepicker 
                        id="date"
                        value={date}
                        selected={date}
                        onChange={(date) => handleDate(date)} 
                        required
                    />
                </label>

                <label htmlFor="name">Name:
                    <input 
                        id="item_name" 
                        type="text" 
                        value={transaction.item_name}
                        onChange={handleTextChange}
                        required
                    />
                </label>
                <br/>
                <label htmlFor="amount">Amount:
                    <input 
                        id="amount" 
                        type="text" 
                        placeholder="$"
                        value={transaction.amount}
                        onChange={handleTextChange}
                        required
                    />
                </label>
                <br/>
                <div className="radio">
                    <div className="deposit">
                        <input 
                            type="radio" 
                            name="action"
                            id="deposit"
                            value="deposit"
                            checked={transaction.action}
                            onClick={handleRadio}
                            required
                        />
                        <label htmlFor="deposit">Deposit </label>
                    </div>
                    <div className="withdrawl">
                        <input 
                            type="radio"
                            name="action"
                            id="withdrawl"
                            value="withdrawal"
                            checked={transaction.action}
                            onClick={handleRadio}
                            required
                        />
                        <label htmlFor="withdrawl">Withdrawal</label>
                    </div>
                </div>
                <label htmlFor="from">From:
                    <input 
                        id="from" 
                        type="text" 
                        value={transaction.from}
                        onChange={handleTextChange}
                        required
                    />
                </label>
                <br/>
                <label htmlFor="category">Category:
                    <select id="category" value={transaction.category} onChange={handleSelect} required>
                        <option value=""></option>
                        <option value="income">Income</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="shopping">Shopping</option>
                        <option value="housing">Housing</option>
                        <option value="other">Other</option>
                    </select> 
                </label>
                <br/>
                <input type="submit" id="submit_edit" />
            </form>
        </div>
    );
}

export default EditForm;