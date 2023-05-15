// Helper function to get the start of the current month
export const getCurrentMonthStart = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	return new Date(year, month, 1, 0, 0, 0); // Set the day to 1 and time to midnight (00:00:00)
};

// Helper function to get the end of the current month
export const getCurrentMonthEnd = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const lastDay = new Date(year, month + 1, 0).getDate(); // Get the last day of the current month
	return new Date(year, month, lastDay, 23, 59, 59); // Set the day to lastDay and time to 23:59:59
};
