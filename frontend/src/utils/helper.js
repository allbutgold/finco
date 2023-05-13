//* format number to $1,222.000

export const formatToDollar = (value) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};

//* styles
export const incomeStyles = {
	background: "var(--primary-col)",
	boxShadow: "var(--boxShadow-100))",
};

export const expenseStyles = {
	background: "var(--secondary-col)",
	boxShadow: "var(--boxShadow-200))",
};

//* category mapping

import bill from "../assets/img/categories/bill.svg";
import bills from "../assets/img/categories/bills.svg";
import capital from "../assets/img/categories/capital.svg";
import cashbag from "../assets/img/categories/cashbag.svg";
import charity from "../assets/img/categories/charity.svg";
import childbenefit from "../assets/img/categories/childbenefit.svg";
import clothing from "../assets/img/categories/clothing.svg";
import coin from "../assets/img/categories/coin.svg";
import coins from "../assets/img/categories/coins.svg";
import debt from "../assets/img/categories/debt.svg";
import education from "../assets/img/categories/education.svg";
import entertainment from "../assets/img/categories/entertainment.svg";
import food from "../assets/img/categories/food.svg";
import healthcare from "../assets/img/categories/healthcare.svg";
import housing from "../assets/img/categories/housing.svg";
import insurance from "../assets/img/categories/insurance.svg";
import personalcare from "../assets/img/categories/personalcare.svg";
import pocketmoney from "../assets/img/categories/pocketmoney.svg";
import rental from "../assets/img/categories/rental.svg";
import studygrants from "../assets/img/categories/studygrants.svg";
import taxes from "../assets/img/categories/taxes.svg";
import transportation from "../assets/img/categories/transportation.svg";
import travel from "../assets/img/categories/travel.svg";
import utilities from "../assets/img/categories/utilities.svg";

export const categories = {
	income: [
		{ id: "1", name: "Assistance", icon: bill },
		{ id: "2", name: "Parental allowance", icon: cashbag },
		{ id: "3", name: "Capital gains", icon: capital },
		{ id: "4", name: "Child benefit", icon: childbenefit },
		{ id: "5", name: "Unemployment Agency", icon: coins },
		{ id: "6", name: "Salary/wages", icon: coin },
		{ id: "7", name: "Rental income", icon: rental },
		{ id: "8", name: "Pension", icon: bills },
		{ id: "9", name: "Self-employed income", icon: coin },
		{ id: "10", name: "Other income", icon: coin },
		{ id: "11", name: "Study grants", icon: studygrants },
		{ id: "12", name: "Pocket money", icon: pocketmoney },
	],
	expense: [
		{ id: "13", name: "Housing", icon: housing },
		{ id: "14", name: "Utilities", icon: utilities },
		{ id: "15", name: "Food and Groceries", icon: food },
		{ id: "16", name: "Transportation", icon: transportation },
		{ id: "17", name: "Healthcare", icon: healthcare },
		{ id: "18", name: "Insurance", icon: insurance },
		{ id: "19", name: "Personal Care", icon: personalcare },
		{ id: "20", name: "Entertainment", icon: entertainment },
		{ id: "21", name: "Education", icon: education },
		{ id: "22", name: "Debt Repayment", icon: debt },
		{ id: "23", name: "Charitable Donations", icon: charity },
		{ id: "24", name: "Taxes", icon: taxes },
		{ id: "25", name: "Travel", icon: travel },
		{ id: "26", name: "Clothing", icon: clothing },
	],
};

//* delay redirect for better ux
export const navigateWithDelay = (navigate, path, ms) => {
	setTimeout(() => {
		navigate(path);
	}, ms);
};

//* map category to transaction
export const mapImage = (category) => {
	let found = categories[category.type].find((element) => {
		return element.name == category.category;
	});
	return found.icon;
};

//* transform date to weekday
export const formatToWeekday = (date) => {
	const newDate = new Date(date);
	return new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(newDate);
};
