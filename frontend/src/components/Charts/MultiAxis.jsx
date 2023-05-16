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
import gradient from "chartjs-plugin-gradient";
import annotationPlugin from "chartjs-plugin-annotation";

import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Title,
	Tooltip,
	gradient,
	annotationPlugin
	// Legend
);

function MultiAxis({ filteredTransaction }) {
	const data = {
		incomeData: [],
		expensesData: [],
		balanceData: [],
		labels: [],
	};

	for (const [date, transactions] of filteredTransaction) {
		let income = 0;
		let expenses = 0;

		for (const transaction of transactions) {
			if (transaction.type === "income") {
				income += +transaction.amount;
			} else if (transaction.type === "expense") {
				expenses += +transaction.amount;
			}
		}

		const prevBalance =
			data.balanceData.length > 0
				? data.balanceData[data.balanceData.length - 1]
				: 0;
		const balance = prevBalance + income - expenses;

		data.incomeData.push(income);
		data.expensesData.push(expenses);
		data.balanceData.push(balance);
		data.labels.push(date);
	}

	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: "Income",
				fill: true,
				data: data.incomeData,
				yAxisID: "income",
				// backgroundColor: "#298bff50",
				tension: 0.5,
				borderColor: "#298bff",
				gradient: {
					backgroundColor: {
						axis: "y",
						colors: {
							0: "#44bbfe50",
							100: "#1e78fe50",
						},
					},
					borderColor: "#298bff",
				},
				datalabels: {
					labels: {
						title: null,
					},
				},
			},
			{
				label: "Expenses",
				fill: true,
				data: data.expensesData,
				yAxisID: "expenses",
				// backgroundColor: " #ffaa1a50",
				borderColor: " #ffaa1a",
				tension: 0.5,
				gradient: {
					backgroundColor: {
						axis: "y",
						colors: {
							0: "##ffcf5350 ",
							100: "#ff990050",
						},
					},
					borderColor: " #ffaa1a",
				},
				datalabels: {
					labels: {
						title: null,
					},
				},
			},
			{
				label: "Balance",
				fill: false,
				data: data.balanceData,
				yAxisID: "balance",
				backgroundColor: " #1aff4850",
				borderColor: " #1aff35b5",
				tension: 0.5,
				datalabels: {
					labels: {
						title: null,
					},
				},
			},
		],
	};
	const maxValue = Math.max(
		...chartData.datasets.flatMap((dataset) => dataset.data)
	);
	const minValue = Math.min(
		...chartData.datasets.flatMap((dataset) => dataset.data)
	);

	// Creating the chart options object
	/* 	const options = {
		responsive: true,
		stacked: true,
		plugins: {
			title: {
				display: false,
				text: "Transactions",
			},
			legend: { display: false },
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
				suggestedMax: maxValue,
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
				suggestedMax: maxValue,

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
				suggestedMax: maxValue,

				display: false,
				beginAtZero: true,
				ticks: {
					display: false,
				},
			},
			balance: {
				suggestedMax: maxValue,
				display: false,
				beginAtZero: false,
				ticks: {
					display: false,
					reverse: true,
				},
			},
		},
	};
 */

	const options = {
		responsive: true,
		stacked: true,
		plugins: {
			annotation: {
				annotations: {
					line1: {
						type: "line",
						yScaleID: "balance",
						yMin: 0,
						yMax: 0,
						borderColor: "rgb(255, 99, 132)",
						borderWidth: 2,
					},
				},
			},
			title: {
				display: false,
				text: "Transactions",
			},
			legend: { display: false },
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
				suggestedMax: maxValue,
				suggestedMin: minValue,

				grid: {
					display: true,
					drawBorder: true,
					drawTicks: false,
					drawOnChartArea: true,
				},
				display: true,
				beginAtZero: true,
				ticks: {
					display: true,
					callback: function (value, index, values) {
						return value < 0 ? -value : value;
					},
				},
			},
			expenses: {
				suggestedMax: maxValue,
				suggestedMin: minValue,
				grid: {
					display: true,
				},
				display: false,
				beginAtZero: true,
				ticks: {
					display: false,
					callback: function (value, index, values) {
						return value < 0 ? -value : value;
					},
				},
			},
			income: {
				suggestedMax: maxValue,
				suggestedMin: minValue,

				display: false,
				beginAtZero: true,
				ticks: {
					display: false,
				},
			},
			balance: {
				suggestedMax: maxValue,
				suggestedMin: minValue,
				display: false,
				beginAtZero: false, // Set to false to include negative values
				ticks: {
					display: false,
					reverse: false,
					callback: function (value, index, values) {
						return value < 0 ? -value : value;
					},
				},
			},
		},
	};

	return <Line data={chartData} options={options} />;
}

export default MultiAxis;
