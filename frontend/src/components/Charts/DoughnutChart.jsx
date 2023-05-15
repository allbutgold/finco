import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function DoughnutChart({ type }) {
	const data = {
		labels: type.labels,
		datasets: [
			{
				label: "$",
				data: type.data,
				backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 223, 0, 0.5)",
          "rgba(255, 140, 0, 0.5)",
          "rgba(50, 205, 50, 0.5)",
          "rgba(0, 191, 255, 0.5)",
          "rgba(147, 112, 219, 0.5)",
          "rgba(255, 0, 255, 0.5)",
          "rgba(255, 69, 0, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 223, 0, 1)",
          "rgba(255, 140, 0, 1)",
          "rgba(50, 205, 50, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(147, 112, 219, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(255, 69, 0, 1)",
        ],
				borderWidth: 1,
			},
		],
	};
	const options = {
		responsive: true,
		stacked: true,
		plugins: {
			title: {
				display: false,
				text: "Transactions",
			},
			legend: {
				display: true,
				align: "start",
				position: "bottom",
				labels: {
					pointStyleWidth: 10,
					boxHeight: 7,
					pointStyle: "circle",
					usePointStyle: true,
				},
			},
		},
	};
	return <Doughnut data={data} options={options} />;
}
export default DoughnutChart;
