import React from 'react';
import { Doughnut} from 'react-chartjs-2';

const DoughnutChartCard = ({ data }) => {
  return (
    <div className="Doughnutchart">
      <div style={{ width: 700 }}>
        <Doughnut
          data={data}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>
    </div>
  );
};

export default DoughnutChartCard ;
