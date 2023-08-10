import React from 'react';
import { Line } from 'react-chartjs-2';


const LineChart = ({ data }) => {
  return (
    <div className="LineChart">
    <div style={{ width: 1000 }}>
      <Line
        data={data}
        options={{ scales: { y: { beginAtZero: true } } }}
      />
    </div>
  </div>
);
};

export default LineChart;
