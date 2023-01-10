//DEPENDECIES
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//COMPONENTS
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TransactionDetails from "./components/TransactionDetails";
import EditForm from "./components/EditForm";
import NewForm from "./components/NewForm";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Home />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/transactions/:id/edit" element={<EditForm />} />
          <Route path="/transactions/new" element={<NewForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
