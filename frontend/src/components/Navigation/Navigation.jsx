import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.scss";
import home from "../../assets/img/home.svg";
import creditCard from "../../assets/img/credit-card.svg";
import plusCircle from "../../assets/img/plus-circle.svg";
import pieChart from "../../assets/img/pie-chart.svg";

const Popup = ({ handleAddExpense, handleAddIncome }) => {
	return (
		<div className="popup">
			<button onClick={handleAddIncome}>Income</button>
			<button onClick={handleAddExpense}>Expense</button>
		</div>
	);
};

const Navigation = () => {
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleAddExpense = () => {
		navigate("/add-expense");
		setShowPopup(false);
	};

	const handleAddIncome = () => {
		navigate("/add-income");
		setShowPopup(false);
	};

	const handleTogglePopup = () => {
		setShowPopup((prevState) => !prevState);
	};

	return (
		<nav className={styles.Navigation}>
			<Link to="/" >
				{location.pathname === "/" ? "Home" : <img src={home} alt="Home" />}
			</Link>
			<Link to="/transactions">
				{location.pathname === "/transactions" ? (
					"Transactions"
				) : (
					<img src={creditCard} alt="Transactions" />
				)}
			</Link>
			<button onClick={handleTogglePopup}>
				{location.pathname === "/add-income" ||
				location.pathname === "/add-expense" ? (
					"add"
				) : (
					<img src={plusCircle} />
				)}
			</button>
			{showPopup && (
          <Popup className={styles.popup}
					handleAddExpense={handleAddExpense}
					handleAddIncome={handleAddIncome}
          />
			)}
			<Link to="/report">
				{location.pathname === "/report" ? (
					"Report"
				) : (
					<img src={pieChart} alt="Report" />
				)}
			</Link>
		</nav>
	);
};

export default Navigation;
