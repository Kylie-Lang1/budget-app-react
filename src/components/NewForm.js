import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" 
import "./css/NewForm.css"

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
        category: "",
        action: ""
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

    const handleRadio = () => {
        const action = document.querySelector("input[type=radio][name=action]:checked").value
        setTransaction({...transaction, action})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(transaction.action === "withdrawal"){
            transaction.amount = 0 - transaction.amount
            setTransaction({...transaction})
        } 
        
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
            <p>Input information for a new transaction below.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date" className="date">Date: 
                    <Datepicker 
                        id="date"
                        placeholderText="mm/dd/yyyy"
                        value={date}
                        selected={date}
                        onChange={(date) => handleDate(date)} 
                        shouldCloseOnSelect={true}
                        required
                    />
                </label>

                <label htmlFor="name">Name:
                <br/>
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
                <br/>
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
                            onClick={handleRadio}
                            required
                        />
                        <label htmlFor="deposit">Deposit </label>
                    </div>
                    <div className="withdrawal">
                        <input 
                            type="radio"
                            name="action"
                            id="withdrawal"
                            value="withdrawal"
                            onClick={handleRadio}
                            required
                        />
                        <label htmlFor="withdrawal">Withdrawal</label>
                    </div>
                </div>
                <label htmlFor="from">From:
                <br/>
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
                <br/>
                    <select id="category" onChange={handleSelect} required>
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
                <input type="submit" id="submit"/>
            </form>
        </div>
    );
}

export default NewForm;