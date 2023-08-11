import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { useLocation } from 'react-router-dom';
 // Import the Navbar component
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { Doughnut } from 'react-chartjs-2';
import NavBar from './NavBar.jsx';
import '../index.css'

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [incidentList, setIncidentList] = useState(null);
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('name');

  useEffect(() => {
    const fetchIncidentList = async () => {
      try {
        const { data, error } = await supabase
          .from('IncidentList')
          .select();
          console.log('Data:', data);
          console.log('Error:', error);

        if (error) {
          setFetchError('An error occurred while fetching data');
          setIncidentList(null);
          console.log(error);
        }
        if (data) {
          setIncidentList(data);
          setFetchError(null);
          console.log('Data:', data);
          console.log('Error:', error);

        }
      } catch (error) {
        console.log('Error fetching data:', error);
        setFetchError('An error occurred while fetching data');
        setIncidentList(null);
      }
    };

    fetchIncidentList();
  }, []);

  console.log('IncidentList:', incidentList);


console.log (setIncidentList) ;

const countIncidentsByStatusAndPriority = (data, status, priority) => {
  return data.filter(
    (incident) =>
      incident.IncidentStatus === status &&
      incident.IncidentPriority === priority
  ).length;
};


const countIncidentsByStatus = (data, status) => {
  if (!data) {
    return 0;
  }
  return data.filter((incident) => incident.IncidentStatus === status).length;
};
const countIncidentsByDates = (data, date) => {
  return data.filter((incident) => incident.opendate === date).length;
};
const countOpenIncidentsByDatesAndPriority = (data, date, priority) => {
  return data.filter(
    (incident) =>
      incident.opendate === date && incident.IncidentPriority === priority
  ).length;
};



const priorityLevels = ['Low', 'Medium', 'High'];
const statusLevels = ['Open', 'Closed'];
const openDate = incidentList ? incidentList.map((incident) => incident.opendate) : [];


const totalOpenCountsByPriority = priorityLevels.map((priority) =>
  incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Open', priority) : 0
);
const totalClosedCountsByPriority = priorityLevels.map((priority) =>
  incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Closed', priority) : 0
);
const openCountsLowPriority = priorityLevels.map((incident) =>
  incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Open', 'Low') : 0
);
const openCountsMediumPriority = priorityLevels.map((priority) =>
  incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Open', 'Medium') : 0
);
const openCountsHighPriority = priorityLevels.map((priority) => 
  incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Open', 'High') : 0
);

const openCountsByDateAndLowPriority = openDate.map((date) =>
  incidentList ? countOpenIncidentsByDatesAndPriority(incidentList, date, 'Low') : 0
);
const openCountsByDateAndMediumPriority = openDate.map((date) =>
  incidentList ? countOpenIncidentsByDatesAndPriority(incidentList, date, 'Medium') : 0
);
const openCountsByDateAndHighPriority = openDate.map((date) =>
  incidentList ? countOpenIncidentsByDatesAndPriority(incidentList, date, 'High') : 0
);
const openCountsByDateAndCriticalPriority = openDate.map((date) =>
  incidentList ? countOpenIncidentsByDatesAndPriority(incidentList, date, 'Critical') : 0
);

const openCountsByDate = openDate.map((date) =>
  incidentList ? countIncidentsByDates(incidentList, date) : 0
);


  

  const BarData = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'Open Incidents',
        data: totalOpenCountsByPriority ,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Closed Incidents',
        data: totalClosedCountsByPriority,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  const LineData = {
    labels: openDate,
    datasets: [
      {
        label: 'Low Priority Incidents',
        data: openCountsByDateAndLowPriority,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Medium Priority Incidents',
        data: openCountsByDateAndMediumPriority,
        backgroundColor: 'rgba(244, 208, 63 )',
        borderColor: 'rgba(14, 13, 1)',
        borderWidth: 1,
      },
      {
        label: 'High Priority Incidents',
        data: openCountsByDateAndHighPriority,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  



  const DoughnutData = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'total Incidents',
        data: totalClosedCountsByPriority,
        backgroundColor: ['rgba(39, 255, 70)','rgb(255, 205, 86)','rgb(246, 134, 35)','rgb(246, 44, 35)'],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };
  const DoughnutData2 = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'total Incidents',
        data: totalOpenCountsByPriority,
        backgroundColor: ['rgba(39, 255, 70)','rgb(255, 205, 86)','rgb(246, 134, 35)','rgb(246, 44, 35)'],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  console.log('BarData:', BarData);
  console.log('LineData:', LineData);
  console.log('Rendering BarChart with data:', BarData);

  return (
    <div className="home">
      {fetchError && <p>{fetchError}</p>}
      <NavBar />
      <h2>Welcome, {userName}!</h2>
      <div className="content">
      <div className="chart-container">
        <div className="Barcharts">
        <div className="chart-column">
          <h2>Current Open & Closed Incidents</h2>
          <BarChart data={BarData} />
        </div>
          <div className="Linecharts">
          <div className="chart-column">
          <h2>Created Incident Counts</h2>
            <LineChart data={LineData} />
          </div>
            <div className="Piecharts">
           
              <canvas id="DoughnutChartCanvas" />
              <div className="chart-column2">
              <h2>Closed Incidents</h2>
              <Doughnut data={DoughnutData} />
              </div>
              <canvas id="DoughnutChartCanvas" />
              <div className="chart-column2">
              <h2>Open Incidents</h2>
              <Doughnut data={DoughnutData2} />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
