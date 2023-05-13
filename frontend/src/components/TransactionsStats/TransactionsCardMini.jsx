import { useState, useRef, useEffect } from "react";
import { userStore } from "../../utils/userStore";

import styles from "./TransactionsStats.module.scss";
import more from "../../assets/img/more-horizontal.svg";
import exceededBudgetImg from "../../assets/img/exceededBudget.svg";
import withinBudgetImg from "../../assets/img/withinBudget.svg";
import { formatToDollar } from "../../utils/helper.js";

function TransactionsCardMini({ img, style, content, options, amount }) {
	const userID = userStore((state) => state.userID);
	const URL = import.meta.env.VITE_BACKEND_URL;
	const [currentBudget, setCurrentBudget] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [isBudgetExceeded, setIsBudgetExceeded] = useState(false);
	const [isBudgetChanged, setIsBudgetChanged] = useState(false);

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
				console.log("data", data);
				setCurrentBudget(data.budget);
				dialogRef.current.close();
				setIsBudgetChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getBudget = async () => {
			try {
				const response = await fetch(URL + "getAllAccountData?id=" + userID, {
					credentials: "include",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				setCurrentBudget(data.budget);
			} catch (error) {
				console.log(error);
			}
		};

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
				const data = await response.json();
				setTotalExpenses(data);
			} catch (error) {
				console.log(error);
			}
		};

		getBudget();
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
					{formatToDollar(currentBudget)}
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
						value={currentBudget}
						onChange={(e) => setCurrentBudget(e.target.value)}
						placeholder={currentBudget}
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
