import { useState } from "react";
import { userStore } from "../../utils/userStore.js";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/img/camera.svg";

const SetupForm = () => {
	const [cardNumber, setCardNumber] = useState("");
	const [expDate, setExpDate] = useState("");
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState();
	const _id = userStore.getState().userID;
	const setUserPic = (value) => userStore.getState().setUserPic(value);

	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND_URL;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("cardNumber", cardNumber);
		formData.append("expDate", expDate);
		formData.append("profileImage", image);
		formData.append("_id", _id);

		const response = await fetch(url + "setup", {
			credentials: "include",
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		setUserPic(url + data.pic);
		console.log(data.message);
		e.target.reset();
		navigate("/");
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
		const [file] = e.target.files;

		if (file) {
			setImageURL(URL.createObjectURL(file));
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<p>Profile Picture</p>
				<div>
					{imageURL && <img src={imageURL} alt="test" />}
					<input
						type="file"
						name="profileImage"
						id="profileImage"
						onChange={handleImageChange}
						accept="image/*"
					/>
					<label htmlFor="profileImage">
						<img src={camera} alt="add image icon" />
					</label>
				</div>

				<label htmlFor="cardNumber" hidden>
					Card Number
				</label>
				<input
					type="text"
					id="cardNumber"
					name="cardNumber"
					placeholder="Card number"
					onChange={(e) => setCardNumber(e.target.value)}
				/>
				<label htmlFor="expDate">Expiration Date</label>
				<input
					type="date"
					name="expDate"
					id="expDate"
					onChange={(e) => setExpDate(e.target.value)}
				/>

				<button type="submit">Profile Complete</button>
			</form>
		</>
	);
};

export default SetupForm;
