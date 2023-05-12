import { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
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
	console.log(data);

	// Creating the chart data object
	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: "Income",
				data: data.incomeData,
				yAxisID: "income",
				backgroundColor: "#298bff",
				borderColor: "#298bff",
			},
			{
				label: "Expenses",
				data: data.expensesData,
				yAxisID: "expenses",
				backgroundColor: " #ffaa1a",
				borderColor: " #ffaa1a",
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
			y: {
				type: "linear",
				display: false,
				position: "left",
				id: "income-axis",
				ticks: {
					beginAtZero: true,
				},
			},
			y1: {
				type: "linear",
				display: false,
				position: "right",
				id: "expenses-axis",
				ticks: {
					beginAtZero: true,
				},
				gridLines: {
					drawOnChartArea: false,
				},
			},
		},
	};

	return <Line data={chartData} options={options} />;
}

export default MultiAxis;
