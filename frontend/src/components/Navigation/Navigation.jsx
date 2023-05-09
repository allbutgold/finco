import { Link } from "react-router-dom";

const Navigation = () => {
  return ( 
    <section>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/add-expense">AddExpense</Link>
      <Link to="/add-income">AddIncome</Link>
      <Link to="/filter-transactions">FilterTranasactions</Link>
      <Link to="/onboarding">Onboarding</Link>
      <Link to="/report">Report</Link>
      <Link to="/setup">Setup</Link>
      <Link to="/transactions">Transactions</Link>
    </section>
  );
}

export default Navigation;