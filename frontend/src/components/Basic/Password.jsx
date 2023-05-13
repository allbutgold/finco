import React, { useState } from "react";
import "./Password.css";

import show from "../../assets/img/eye-open.svg";
import hide from "../../assets/img/eye-closed.svg";

function Password({ value, onChange }) {
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState("password");

	return (
		<div className="pwd-container">
			<input
				type={type}
				name="password"
				id="password"
				value={value}
				onChange={onChange}
				placeholder="Password"
			/>
			{visible ? (
				<img
					className="pwd"
					src={show}
					onClick={() => {
						setVisible(false);
						setType("password");
					}}
				/>
			) : (
				<img
					className="pwd"
					src={hide}
					onClick={() => {
						setVisible(true);
						setType("text");
					}}
				/>
			)}
		</div>
	);
}

export default Password;
