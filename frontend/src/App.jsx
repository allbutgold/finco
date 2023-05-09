import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

// pages
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Menu from './pages/Menu/Menu.jsx';
import AddExpense from './pages/AddTransactions/AddExpense.jsx';
import AddIncome from './pages/AddTransactions/AddIncome.jsx';
import FilterTranasactions from './pages/FilterTransactions/FilterTransactions.jsx';
import Onboarding from './pages/Onboarding/Onboarding.jsx';
import Report from './pages/Report/Report.jsx';
import Setup from './pages/Setup/Setup.jsx';
import Transactions from './pages/Transactions/Transactions.jsx';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/add-expense" element={<AddExpense/>} />
        <Route path="/add-income" element={<AddIncome/>} />
        <Route path="/filter-transactions" element={<FilterTranasactions/>} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/setup" element={<Setup/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>

    </>
  )
}

export default App
