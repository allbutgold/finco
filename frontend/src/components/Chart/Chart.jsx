import { LineChart, Line, XAxis, YAxis, CartesianGrid,  ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { userStore } from '../../utils/userStore';

const Chart = () => {
  const [ChartData, setChartData] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const userID = userStore(state => state.userID);

  useEffect(() => {
    const getChartData = async () => {
      const response = await fetch(URL + "getAllTransactions?id=" + userID, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      const sortedChartData = Object.entries(data).sort(
        (a, b) => new Date(b[0]) - new Date(a[0])
      );
      setChartData(sortedChartData);
      
    }
    getChartData();
  }, []);
  console.log(ChartData)

  return (
    <article>
      <LineChart
        width={500}
        height={300}
        data={ChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className="chart"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </article>

  )
}

export default Chart;