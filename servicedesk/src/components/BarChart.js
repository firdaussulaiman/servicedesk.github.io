import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  return (
    <div className="BarChart">
      <div style={{ width: 1000 }}>
        <Bar
          data={data}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>
    </div>
  );
};

export default BarChart;