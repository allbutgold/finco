import forward from "../../assets/img/forward.svg";

import styles from "./TransactionForm.module.scss";
import { v4 as uuid } from "uuid";
//TODO: Write categories into database ?
//TODO: ADD expenseCat
//TODO: BONUS: ADD search function and add Category function
//TODO: ADD unique idss
const incomeCat = [
	"Assistance",
	"Parental allowance",
	"Capital gains",
	"Child benefit",
	"Benefits from the Federal Employment Agency",
	"Salary/wages",
	"Rental income",
	"Pension",
	"Self-employed income",
	"Other income",
	"Study grants",
	"Pocket money",
];

function CategoryList({ onClick, open }) {
	return (
		<div
			className={
				open
					? `${styles.moveIn} ${styles.CategoryList}`
					: open === null
					? `${styles.CategoryList}`
					: `${styles.CategoryList} ${styles.moveOut}`
			}>
			{/* <input type="search" name="search" id="search" /> */}
			<h2>Choose a Category</h2>
			{incomeCat.map((category) => (
				<label onClick={onClick} htmlFor={category}>
					{category}
					<input type="radio" name="category" id={category} value={category} />
					<img src={forward} alt="icon" />
				</label>
			))}
		</div>
	);
}

export default CategoryList;
