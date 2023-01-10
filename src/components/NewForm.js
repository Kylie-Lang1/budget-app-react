import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" 

function NewForm() {
    const API = process.env.REACT_APP_API_URL
    const navigate = useNavigate()

    const [transaction, setTransaction] = useState({
        id: crypto.randomUUID(),
        item_name: "",
        amount: "",
        date: "",
        date_formatted: "",
        from: "",
        category: ""
    })
    const [date, setDate] = useState("")

    const handleDate = (date) => {
        const dateString = date.toLocaleDateString()
        const date_formatted = dateString.slice(0, dateString.length - 4) + dateString.slice(dateString.length-2)
        console.log(date_formatted)
        
        setDate(date)
        setTransaction({...transaction, date, date_formatted})
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${API}/transactions`, transaction)
            .then((res) => {
                setTransaction(res.data)
                navigate("/transactions")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="new">
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date: 
                    <Datepicker 
                        id="date"
                        // dateFormat="MM/dd/yyyy"
                        value={date}
                        selected={date}
                        onChange={(date) => handleDate(date)} 
                    />
                </label>

                <label htmlFor="name">Name:
                    <input 
                        id="item_name" 
                        type="text" 
                        value={transaction.item_name}
                        onChange={handleTextChange}
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
                    />
                </label>
                <br/>
                <label htmlFor="from">From:
                    <input 
                        id="from" 
                        type="text" 
                        value={transaction.from}
                        onChange={handleTextChange}
                    />
                </label>
                <br/>
                <label htmlFor="category">Category:
                    <select id="category" onChange={handleSelect}>
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
                <input type="submit" />
            </form>
        </div>
    );
}

export default NewForm;