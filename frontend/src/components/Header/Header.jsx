import styles from "./Header.module.scss";

import { userStore } from "../../utils/userStore";

import backIcon from "../../assets/img/back.svg";
import logoIcon from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

function Header({ name, back }) {
	const navigate = useNavigate();
	const username = userStore((state) => state.username);
	const pic = userStore((state) => state.userPic);

	return (
		<header className={styles.Header}>
			{name ? (
				<div>
					<p>Welcome back,</p>
					<h3>{username}</h3>
				</div>
			) : back ? (
				<img
					width="25px"
					onClick={() => navigate(-1)}
					src={backIcon}
					alt="back"
				/>
			) : (
				<img src={logoIcon} alt="logo" width="45px" />
			)}
			<img
				onClick={() => {
					navigate("/menu");
				}}
				src={pic}
				alt="profile image"
				width="45px"
				height="45px"
			/>
		</header>
	);
}

export default Header;
