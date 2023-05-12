
import styles from "./Report.module.scss";
import AllTransactions from "../../components/AllTransactions/AllTransactions.jsx";
import Header from "../../components/Header/Header.jsx";
import { userStore } from "../../utils/userStore.js";
import { useEffect, useState } from "react";
import MultiAxis from "../../components/Charts/MultiAxis";

const Report = () => {
	const [transactions, setTransactions] = useState([]);
	const URL = import.meta.env.VITE_BACKEND_URL;
	const userID = userStore((state) => state.userID);

	useEffect(() => {
		const getTransactions = async () => {
			const response = await fetch(URL + "getAllTransactions?id=" + userID, {
				credentials: "include",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setTransactions(data);
		};
		getTransactions();
	}, []);

	return (
		<section className={styles.Report}>
			<Header profile />
			<MultiAxis transactions={transactions} />
			<h1>Total Transactions</h1>
			<AllTransactions transactions={transactions} />
		</section>
	);
};

export default Report;
