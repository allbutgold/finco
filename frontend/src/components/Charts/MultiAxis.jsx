import { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Filler,
	Tooltip,

	// Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Title,
	Tooltip
	// Legend
);

function MultiAxis({ transactions }) {
	const data = Object.entries(transactions).reduce(
		(acc, [date, items]) => {
			const income = items
				.filter((item) => item.type === "income")
				.reduce((sum, item) => sum + +item.amount, 0);
			const expenses = items
				.filter((item) => item.type === "expense")
				.reduce((sum, item) => sum + +item.amount, 0);
			acc.incomeData.push(income);
			acc.expensesData.push(expenses);
			acc.labels.push(date);
			return acc;
		},
		{ incomeData: [], expensesData: [], labels: [] }
	);

	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: "Income",
				fill: true,
				data: data.incomeData,
				yAxisID: "income",
				backgroundColor: "#298bff50",
				// backgroundColor: gradient,
				borderColor: "#298bff",
				tension: 0.5,
			},
			{
				label: "Expenses",
				fill: true,
				data: data.expensesData,
				yAxisID: "expenses",
				backgroundColor: " #ffaa1a50",
				borderColor: " #ffaa1a",
				tension: 0.5,
			},
		],
	};

	// Creating the chart options object
	const options = {
		responsive: true,
		stacked: true,
		plugins: {
			title: {
				display: false,
				text: "Transactions",
			},
		},
		scales: {
			x: {
				ticks: {
					align: "inner",
					callback: (value, index, values) => {
						if (index === 0 || index === values.length - 1) {
							return chartData.labels[index];
						}
						// return value;
					},
					// color: "transparent",
					// display: false,
				},
				plugins: {
					tooltip: {
						enabled: true,
					},
				},

				grid: {
					drawBorder: true,
					drawTicks: true,
				},
			},
			y: {
				grid: {
					display: true,
					drawBorder: true,
					drawTicks: false,
					drawOnChartArea: true,
				},
				display: true,
				beginAtZero: true,
				ticks: {
					display: false,
				},
			},
			expenses: {
				grid: {
					display: true,
				},
				display: false,
				beginAtZero: true,
				ticks: {
					display: false,
				},
			},
			income: {
				display: false,
				beginAtZero: true,
				ticks: {
					display: false,
				},
			},
		},
	};

	return <Line data={chartData} options={options} />;
}

export default MultiAxis;
