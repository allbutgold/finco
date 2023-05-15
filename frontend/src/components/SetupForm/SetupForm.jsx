import { useEffect, useRef, useState } from "react";
import { userStore } from "../../utils/userStore.js";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/img/camera.svg";
import toast, { Toaster } from "react-hot-toast";
import {
	formatToDollar,
	navigateWithDelay,
	formatCreditCardNumber,
	failed,
} from "../../utils/helper.js";

const SetupForm = () => {
	const userPic = userStore.getState().userPic;
	const budget = userStore.getState().budget;
	const _id = userStore.getState().userID;
	const [cardNumber, setCardNumber] = useState("");
	const [expDate, setExpDate] = useState("");
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState(userPic);
	const [currentBudget, setCurrentBudget] = useState(budget);
	const [today, setToday] = useState(new Date());

	const setUserPic = (value) => userStore.getState().setUserPic(value);
	const setBudget = (value) => userStore.getState().setBudget(value);
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND_URL;
	const btnRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append("_id", _id);
		let card = formData.get("cardNumber");

		const setupUser = fetch(url + "setup", {
			credentials: "include",
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				setUserPic(url + data.account.profileImage);
				setBudget(data.account.budget);
			})
			.catch((err) => {
				throw new Error(err);
			});

		if (userPic == null) {
			if (
				//if cardnumber = 19 && inputdate is after today
				card.length == 19 &&
				new Date(formData.get("expDate")) > today &&
				currentBudget !== " " &&
				formData.get("profileImage") !== " "
			) {
				await toast.promise(setupUser, {
					loading: "Checking Input",
					success: "Added Information",
					error: (err) => {
						console.error(err);
						return "Please try again :(";
					},
				});
			} else {
				failed(btnRef.current);
				return;
			}
		} else {
			if (
				((card.length == 19 || card == " ") &&
					new Date(formData.get("expDate") > today)) ||
				currentBudget !== " "
			) {
				await toast.promise(setupUser, {
					loading: "Checking Input",
					success: "Changed setup",
					error: (err) => {
						console.error(err);
						return "Please try again :(";
					},
				});
			} else {
				failed(btnRef.current);
				return;
			}
		}
		navigateWithDelay(navigate, "/", 2000);
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
		const [file] = e.target.files;
		if (file) {
			setImageURL(URL.createObjectURL(file));
		}
	};

	const handleDateChange = (e) => {
		const inputDate = new Date(e.target.value);
		if (inputDate < today) {
			alert("Your credit card needs to be valid");
			setExpDate("");
		} else {
			setExpDate(e.target.value);
		}
	};

	const handleCreditCard = (e) => {
		const formattedValue = formatCreditCardNumber(e.target.value);
		if (formattedValue.length <= 19) {
			setCardNumber(formattedValue);
		}
	};
	return (
		<>
			<Toaster />
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<p>Profile Picture</p>
				<div>
					{imageURL && <img src={imageURL} alt="image" />}
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
					value={cardNumber}
					required={userPic == null}
					minLength="19"
					placeholder="Card number"
					onChange={handleCreditCard}
				/>
				<label htmlFor="expDate">Expiration Date</label>
				<input
					type="text"
					name="expDate"
					id="expDate"
					value={expDate}
					placeholder="dd/mm/yyyy"
					required={userPic == null}
					min={new Date().toISOString().split("T")[0]}
					onMouseOver={(e) => {
						e.currentTarget.type = "date";
						e.currentTarget.focus();
					}}
					onChange={handleDateChange}
				/>
				<label htmlFor="budget">Budget</label>
				<input
					type="number"
					name="budget"
					id="budget"
					minLength="0"
					onChange={(e) => {
						setCurrentBudget(e.target.value);
					}}
					placeholder={formatToDollar(currentBudget)}
					required={userPic == null}
				/>

				<button ref={btnRef} type="submit">
					{userPic !== null ? "Edit Info" : "Profile Complete"}
				</button>
			</form>
		</>
	);
};

export default SetupForm;
