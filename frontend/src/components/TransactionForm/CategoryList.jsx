import forward from "../../assets/img/forward.svg";

import styles from "./TransactionForm.module.scss";
import { categories } from "../../utils/helper.js";
//TODO: Write categories into database ?
//TODO: BONUS: ADD search function and add Category function

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
			{/* <input
				type="search"
				name="search"
				id="search"
				onChange={() => {
					categories[`${type}`].filter((category) => {});
				}}
			/> */}
			<h2>Choose a Category</h2>
			{categories[`${type}`].map((category) => (
				<label onClick={onClick} key={category.id} htmlFor={category.name}>
					{category.name}
					<input
						type="radio"
						name="category"
						id={category.name}
						value={category.name}
						required
					/>
					<img src={forward} alt="icon" />
				</label>
			))}
		</div>
	);
}

export default CategoryList;
