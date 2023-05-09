import styles from "./CreditCardDetails.module.scss";

import chip from "../../assets/img/chip.svg";
import check from "../../assets/img/check.svg";
import { useEffect, useState } from "react";

function CreditCardDetails() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [cardInfo, setCardInfo] = useState({});
	//TODO: Figure out how to get id after authentication is done
	const id = "645a16533158d3749633f5df";

	//TODO: Add credentials true whenever authentication is done
	//! might overthrow below if data is received through page
	useEffect(() => {
		const getCreditCardInfo = async () => {
			try {
				const result = await fetch(url + "getAccountData?id=" + id);
				const data = await result.json();

				let date = new Intl.DateTimeFormat("default", {
					year: "2-digit",
					month: "numeric",
				}).format(new Date(data.expDate));

				let cardNumber = data.cardNumber.split(" ")[3];

				setCardInfo({ cardNumber: cardNumber, expDate: date });
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
