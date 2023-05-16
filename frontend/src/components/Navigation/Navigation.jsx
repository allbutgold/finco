import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.scss";
import {
	addActive,
	add,
	home,
	homeActive,
	transactionsActive,
	transactions,
	reportActive,
	report,
} from "../../assets/img/navigation/navigation-icons.js";

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
			<Link to="/">
				{location.pathname === "/" ? (
					<img src={homeActive} alt="Home" />
				) : (
					<img src={home} alt="Home" />
				)}
			</Link>
			<Link to="/transactions">
				{location.pathname === "/transactions" ? (
					<img src={transactionsActive} alt="Transactions" />
				) : (
					<img src={transactions} alt="Transactions" />
				)}
			</Link>

			<Link to="/add-transaction">
				{location.pathname === "/add-transaction" ? (
					<img src={addActive} alt="Add Transaction" />
				) : (
					<img src={add} alt="Add Transaction" />
				)}
			</Link>
			<Link to="/report">
				{location.pathname === "/report" ? (
					<img src={reportActive} alt="Report" />
				) : (
					<img src={report} alt="Report" />
				)}
			</Link>
		</nav>
	);
};

export default Navigation;
