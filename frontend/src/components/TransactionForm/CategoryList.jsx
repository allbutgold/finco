import styles from "./TransactionForm.module.scss";
import { categories } from "../../utils/helper.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//TODO: Write categories into database ?
//TODO: BONUS: ADD search function and add Category function
import forward from "../../assets/img/forward.svg";
import search from "../../assets/img/search.svg";
import back from "../../assets/img/back.svg";

function CategoryList({ onClick, open, type, onclick }) {
	const navigate = useNavigate();
	const searchRef = useRef();
	const [filteredCat, setFiltered] = useState(categories[`${type}`]);

	const filterCategories = () => {
		const searchQuery = searchRef.current.value.toLowerCase();
		const filtered = categories[`${type}`].filter((category) =>
			category.name.toLowerCase().includes(searchQuery)
		);
		setFiltered(filtered);
	};

	return (
		<div
			className={
				open
					? `${styles.moveIn} ${styles.CategoryList}`
					: open === null
						? `${styles.CategoryList}`
						: `${styles.CategoryList} ${styles.moveOut}`
			}>
			<div className={styles.categoryHeader}>
				<button onClick={onclick}>
					<img src={back} alt="back" />
				</button>
				<h2>Choose a Category</h2>
				<label htmlFor="search">
					<img src={search} alt="search icon" />
					<input
						className="collapsed"
						type="search"
						name="search"
						ref={searchRef}
						id="search"
						onChange={() => filterCategories()}
						placeholder="Search for category"
					/>
				</label>
			</div>

			{filteredCat.length > 0 ? (
				filteredCat.map((category) => (
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
				))
			) : (
				<p className={styles.notFound}> Sorry no matching category found !</p>
			)}
		</div>
	);
}

export default CategoryList;
