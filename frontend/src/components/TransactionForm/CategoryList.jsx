import forward from "../../assets/img/forward.svg";

import styles from "./TransactionForm.module.scss";
import { categories } from "../../utils/helper.js";
import { v4 as uuid } from "uuid";
//TODO: Write categories into database ?
//TODO: BONUS: ADD search function and add Category function
//TODO: ADD unique idss
function CategoryList({ onClick, open, type }) {
	console.log(type);
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
			{categories[`${type}`].map((category) => (
				<label onClick={onClick} htmlFor={category}>
					{category}
					<input
						type="radio"
						name="category"
						id={category}
						value={category}
						required
					/>
					<img src={forward} alt="icon" />
				</label>
			))}
		</div>
	);
}

export default CategoryList;
