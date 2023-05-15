import { useState, useRef, useEffect } from "react";
import { userStore } from "../../utils/userStore";

import styles from "./TransactionsStats.module.scss";
import more from "../../assets/img/more-horizontal.svg";
import exceededBudgetImg from "../../assets/img/exceededBudget.svg";
import withinBudgetImg from "../../assets/img/withinBudget.svg";
import { formatToDollar } from "../../utils/helper.js";

function TransactionsCardMini({ img, style, content, options, amount }) {
	const userID = userStore((state) => state.userID);
	const budget = userStore((state) => state.budget);
	const setBudget = userStore((state) => state.setBudget);
	const [currentBudget, setCurrentBudget] = useState(budget);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [isBudgetExceeded, setIsBudgetExceeded] = useState(false);
	const [isBudgetChanged, setIsBudgetChanged] = useState(false);

	const URL = import.meta.env.VITE_BACKEND_URL;

	const changeBudget = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(URL + "setBudget?id=" + userID, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ budget: currentBudget }),
			});
			if (!response.ok) {
				throw new Error("Could not set budget");
			} else {
				const data = await response.json();
				setBudget(data.budget);
				dialogRef.current.close();
				setIsBudgetChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const getTotalExpenses = async () => {
			try {
				const response = await fetch(
					URL + "getTotalExpensesByMonth?id=" + userID,
					{
						credentials: "include",
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setTotalExpenses(data);
				} else {
					setTotalExpenses(0);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getTotalExpenses();
	}, [userID, URL, isBudgetChanged]);

	useEffect(() => {
		setIsBudgetExceeded(totalExpenses > currentBudget);
	}, [totalExpenses, currentBudget]);

	const dialogRef = useRef();
	return (
		<article className={styles.TransactionCardMini}>
			{isBudgetExceeded ? (
				<img src={exceededBudgetImg} alt="Exceeded Budget" />
			) : (
				<img src={withinBudgetImg} alt="Within Budget" />
			)}
			<div>
				<p>{content}</p>
				<h4>
					{/* {content === "Expense" || content === "Current" ? "-" : "+"}{" "} */}
					{formatToDollar(budget)}
				</h4>
			</div>
			{options ? (
				<button
					onClick={() => {
						dialogRef.current.showModal();
					}}>
					<img src={more} alt="show more" />
				</button>
			) : (
				""
			)}
			<dialog ref={dialogRef}>
				<form onSubmit={changeBudget}>
					<label htmlFor="budget">Change your budget</label>
					<input
						type="number"
						name="budget"
						id="budget"
						onChange={(e) => setCurrentBudget(e.target.value)}
						placeholder={budget}
					/>
					<div>
						<button type="submit">CHANGE</button>
						<button onClick={() => dialogRef.current.close()}>Close</button>
					</div>
				</form>
			</dialog>
		</article>
	);
}

export default TransactionsCardMini;
