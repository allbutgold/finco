//* functions
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

export const categories = {
	income: [
		"Assistance",
		"Parental allowance",
		"Capital gains",
		"Child benefit",
		"Benefits from the Federal Employment Agency",
		"Salary/wages",
		"Rental income",
		"Pension",
		"Self-employed income",
		"Other income",
		"Study grants",
		"Pocket money",
	],
	expense: [
		"Housing",
		"Utilities",
		"Food and Groceries",
		"Transportation",
		"Healthcare",
		"Insurance",
		"Personal Care",
		"Entertainment",
		"Education",
		"Debt Repayment",
		"Charitable Donations",
		"Taxes",
		"Travel",
	],
};
