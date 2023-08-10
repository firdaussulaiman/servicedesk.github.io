import React from 'react';
import { Pie} from 'react-chartjs-2';

const PieChartCard = ({ data }) => {
  return (
    <div className="BarChart">
      <div style={{ width: 700 }}>
        <Pie
          data={data}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>
    </div>
  );
};

export default PieChartCard;
