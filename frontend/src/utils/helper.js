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
		{ id: "1", name: "Assistance" },
		{ id: "2", name: "Parental allowance" },
		{ id: "3", name: "Capital gains" },
		{ id: "4", name: "Child benefit" },
		{ id: "5", name: "Benefits from the Federal Employment Agency" },
		{ id: "6", name: "Salary/wages" },
		{ id: "7", name: "Rental income" },
		{ id: "8", name: "Pension" },
		{ id: "9", name: "Self-employed income" },
		{ id: "10", name: "Other income" },
		{ id: "11", name: "Study grants" },
		{ id: "12", name: "Pocket money" },
	],
	expense: [
		{ id: "13", name: "Housing" },
		{ id: "14", name: "Utilities" },
		{ id: "15", name: "Food and Groceries" },
		{ id: "16", name: "Transportation" },
		{ id: "17", name: "Healthcare" },
		{ id: "18", name: "Insurance" },
		{ id: "19", name: "Personal Care" },
		{ id: "20", name: "Entertainment" },
		{ id: "21", name: "Education" },
		{ id: "22", name: "Debt Repayment" },
		{ id: "23", name: "Charitable Donations" },
		{ id: "24", name: "Taxes" },
		{ id: "25", name: "Travel" },
	],
};
