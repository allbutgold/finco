//* format number to $1,222.000
export const formatToDollar = (value) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
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

//* delay redirect for better ux
export const navigateWithDelay = (navigate, path, ms) => {
	setTimeout(() => {
		navigate(path);
	}, ms);
};

//* map category to transaction
export const mapEmoji = (transaction) => {
	let found = categories[transaction.type].find((element) => {
		return element.name == transaction.category;
	});
	if (found) {
		return found.emoji;
	} else {
		return " ";
	}
};

export const mapCategory = (category, type) => {
	let found = categories[type].find((element) => {
		return element.name == category;
	});
	return found["emoji"];
};

//* map color to transaction
export const mapColor = (category) => {
	let found = categories[category.type].find((element) => {
		return element.name == category.category;
	});
	return found.color;
};

//* transform date to weekday
export const formatToWeekday = (date) => {
	const newDate = new Date(date);
	return new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(newDate);
};

//* format credicard number

export const formatCreditCardNumber = (inputValue) => {
	// Remove all non-digits from the input value
	const digitsOnly = inputValue.replace(/\D/g, "");
	// Add a space after every four digits
	const formattedValue = digitsOnly.replace(/(\d{4})/g, "$1 ");
	return formattedValue.trim();
};

//* add failed class to element

export const failed = (element) => {
	element.classList.add("failed");
	setTimeout(() => {
		element.classList.remove("failed");
	}, 400);
};

import { elements } from "chart.js";
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
		{
			id: "1",
			name: "Assistance",
			icon: bill,
			emoji: "💰",
		},
		{
			id: "2",
			name: "Parental allowance",
			icon: cashbag,
			emoji: "🤰🏻",
		},
		{
			id: "3",
			name: "Capital gains",
			icon: capital,
			emoji: "💹",
		},
		{
			id: "4",
			name: "Child benefit",
			icon: childbenefit,
			emoji: "🧒",
		},
		{
			id: "5",
			name: "Unemployment Agency",
			icon: coins,
			emoji: "🏛️",
		},
		{
			id: "6",
			name: "Salary/wages",
			icon: coin,
			emoji: "💵",
		},
		{
			id: "7",
			name: "Rental income",
			icon: rental,
			emoji: "🏠",
		},
		{
			id: "8",
			name: "Pension",
			icon: bills,
			emoji: "👴🏻",
		},
		{
			id: "9",
			name: "Self-employed income",
			icon: coin,
			emoji: "👨🏼‍⚕️",
		},
		{
			id: "10",
			name: "Other income",
			icon: coin,
			emoji: "🧧",
		},
		{
			id: "11",
			name: "Study grants",
			icon: studygrants,
			emoji: "🎓",
		},
		{
			id: "12",
			name: "Pocket money",
			icon: pocketmoney,
			emoji: "👛",
		},
	],
	expense: [
		{
			id: "13",
			name: "Housing",
			icon: housing,
			emoji: "🏠",
		},
		{
			id: "14",
			name: "Utilities",
			icon: utilities,
			emoji: "💡",
		},
		{
			id: "15",
			name: "Food and Groceries",
			icon: food,
			emoji: "🍔",
		},
		{
			id: "16",
			name: "Transportation",
			icon: transportation,
			emoji: "🚗",
		},
		{
			id: "17",
			name: "Healthcare",
			icon: healthcare,
			emoji: "🏥",
		},
		{
			id: "18",
			name: "Insurance",
			icon: insurance,
			emoji: "📄",
		},
		{
			id: "19",
			name: "Personal Care",
			icon: personalcare,
			emoji: "💅🏼",
		},
		{
			id: "20",
			name: "Entertainment",
			icon: entertainment,
			emoji: "🎭",
		},
		{
			id: "21",
			name: "Education",
			icon: education,
			emoji: "📚",
		},
		{
			id: "22",
			name: "Debt Repayment",
			icon: debt,
			emoji: "🏦",
		},
		{
			id: "23",
			name: "Charitable Donations",
			icon: charity,
			emoji: "🤝",
		},
		{
			id: "24",
			name: "Taxes",
			icon: taxes,
			emoji: "💸",
		},
		{
			id: "25",
			name: "Travel",
			icon: travel,
			emoji: "✈️",
		},
		{
			id: "26",
			name: "Clothing",
			icon: clothing,
			emoji: "👗",
		},
	],
};
