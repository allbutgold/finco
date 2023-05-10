import styles from "./CreditCardDetails.module.scss";

import chip from "../../assets/img/chip.svg";
import check from "../../assets/img/check.svg";
import { useEffect, useState } from "react";
import { userStore } from "../../utils/userStore.js";

function CreditCardDetails() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [cardInfo, setCardInfo] = useState({});
	const [validCC, setValidCC] = useState(true);
	const userID = userStore((state) => state.userID);

	//! might overthrow below if data is received through page
	//TODO Add valdiation of credit card; if valid show check else shox cross; do this in backend
	useEffect(() => {
		const getCreditCardInfo = async () => {
			try {
				const result = await fetch(url + "getAccountData?id=" + userID, {
					credentials: "include",
				});
				if (result.ok) {
					const data = await result.json();

					let date = new Intl.DateTimeFormat("default", {
						year: "2-digit",
						month: "numeric",
					}).format(new Date(data.expDate));

					let cardNumber = data.cardNumber.split(" ")[3];

					setCardInfo({ cardNumber: cardNumber, expDate: date });
				} else {
					const message = await result.json();
					throw new Error(message);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getCreditCardInfo();
	}, []);

	if (!cardInfo) return;

	return (
		<div className={styles.CreditCard}>
			<div className={styles.verification}>
				<img src={check} alt="verification icon" />
			</div>
			<div className={styles.container}>
				<p>Credit Card</p>
				<h5>
					<span>•••• •••• ••••</span> {cardInfo.cardNumber}
				</h5>
				<img src={chip} alt="chip" width="50px" />
				<h6>{cardInfo.expDate}</h6>
			</div>
		</div>
	);
}

export default CreditCardDetails;
