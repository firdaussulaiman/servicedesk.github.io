import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartComponent = ({ data }) => {
  return (
    <div style={{ width: 700 }}>
      <Line data={data} options={{ scales: { y: { beginAtZero: true } } }} />
    </div>
  );
};

export default LineChartComponent;
