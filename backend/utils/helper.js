export const getCurrentMonthStart = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	return new Date(year, month, 1, 0, 0, 0); 
};

export const getCurrentMonthEnd = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const lastDay = new Date(year, month + 1, 0).getDate(); 
	return new Date(year, month, lastDay, 23, 59, 59);
};
