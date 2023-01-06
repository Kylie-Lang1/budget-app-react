//DEPENDECIES
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//COMPONENTS
import NavBar from "./components/NavBar";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
