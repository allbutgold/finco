import styles from "./HeaderName.module.scss";

function HeaderName({ name, img }) {
	return (
		<header className={styles.HeaderName}>
			<p>Welcome back,</p>
			<h3>{name}</h3>
			<img src={img} alt="profile image" />
		</header>
	);
}

export default HeaderName;
