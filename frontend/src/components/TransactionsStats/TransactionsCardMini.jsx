import React, { useRef, useState } from "react";

import styles from "./TransactionsStats.module.scss";
import more from "../../assets/img/more-horizontal.svg";

function TransactionsCardMini({ img, style, content, options, amount }) {
	const dialogRef = useRef();
	return (
		<article className={styles.TransactionCardMini}>
			<img src={img} alt="icon" style={style} />
			<div>
				<p>{content}</p>
				<h4>
					{content == "Expense" || content == "Current" ? "-" : "+"} {amount}
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
				<label htmlFor="budget">Change your budget</label>
				<input
					type="number"
					name="budget"
					id="budget"
					defaultValue={amount}
					placeholder={amount}
				/>
				<div>
					<button>CHANGE</button>
					<button onClick={() => dialogRef.current.close()}>KEEP</button>
				</div>
			</dialog>
		</article>
	);
}

export default TransactionsCardMini;
