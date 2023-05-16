import { useState, useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import styles from "./AccountBalance.module.scss";
import { formatToDollar } from "../../utils/helper.js";

const AccountBalance = () => {
	const [balance, setBalance] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const userID = userStore((state) => state.userID);

	useEffect(() => {
		const getMontlyBalance = async () => {
			try {
				const result = await fetch(
					url + "getTotalTransactionsByMonth?id=" + userID,
					{
						credentials: "include",
					}
				);
				if (result.ok) {
					const data = await result.json();
					setBalance(data.total);
					// console.log(data)
				} else {
					const message = await result.text();
					throw new Error(message);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getMontlyBalance();
	});

	return (
		<div className={styles.AccountBalance}>
			<p>Disposable income</p>
			{/* <h4>
				{balance < 0 ? "-$" : "$"}
				{Math.abs(balance)}
			</h4> */}

			{/* format to Dollar */}
			<h4>
				{formatToDollar(balance)}
			</h4>
		</div>
	);
};

export default AccountBalance;
