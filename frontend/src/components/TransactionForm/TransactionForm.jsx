import styles from "./TransactionForm.module.scss";
import forward from "../../assets/img/forward.svg";
import CategoryList from "./CategoryList";
import { useState } from "react";

function TransactionForm({ type, handleSubmit }) {
	const [open, setOpen] = useState(null);
	const [selectedCat, setCategory] = useState("Assistance");

	const handleCategory = (event) => {
		setCategory(event.target.value);
		setOpen(false);
	};
	console.log(selectedCat);

	return (
		<div className={styles.TransactionForm}>
			<form onSubmit={handleSubmit}>
				<label htmlFor="transaction">
					<p>$</p>
					<input type="number" name="amount" id="amount" placeholder="0" />
				</label>

				<label htmlFor="category">Category</label>
				<button
					onClick={() => {
						setOpen(true);
					}}
					className={styles.btn}
					type="button"
					value={selectedCat}>
					{selectedCat} <img src={forward} alt="arrow" />
				</button>
				<CategoryList onClick={handleCategory} open={open} />
				<div>
					<label htmlFor="date">Date</label>
					<label htmlFor="time">Time</label>
					<input type="date" name="date" id="date" />
					<input type="time" name="time" id="time" />
				</div>
				<button type="submit">Add {type}</button>
			</form>
		</div>
	);
}

export default TransactionForm;
