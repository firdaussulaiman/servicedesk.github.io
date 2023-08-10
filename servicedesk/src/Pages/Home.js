import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { useLocation } from 'react-router-dom';
 // Import the Navbar component
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { Pie } from 'react-chartjs-2';
import NavBar from './NavBar.jsx';

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

        if (error) {
          setFetchError('An error occurred while fetching data');
          setIncidentList(null);
          console.log(error);
        }
        if (data) {
          setIncidentList(data);
          setFetchError(null);
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

  console.log('countIncidentsByStatus :', countIncidentsByStatus);

  const priorityLevels = ['Low', 'Medium', 'High', 'Critical'];
  const statusLevels = ['Open', 'Closed', 'Total'];
  const totalCounts = incidentList ? incidentList.length : 0;
  const openCounts = incidentList ? countIncidentsByStatus(incidentList, 'Open') : 0;
  const closedCounts = incidentList ? countIncidentsByStatus(incidentList, 'Closed') : 0;

  const openCountsByPriority = priorityLevels.map((priority) =>
    incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Open', priority) : 0
  );
  const closedCountsByPriority = priorityLevels.map((priority) =>
    incidentList ? countIncidentsByStatusAndPriority(incidentList, 'Closed', priority) : 0
  );

  console.log('openCountsByPriority:', openCountsByPriority);
  const BarData = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'Open Incidents',
        data: openCountsByPriority,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Closed Incidents',
        data: closedCountsByPriority,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const LineData = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'Open Incidents',
        data: openCountsByPriority,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Closed Incidents',
        data: closedCountsByPriority,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const PieData = {
    labels: priorityLevels,
    datasets: [
      {
        label: 'Open Incidents',
        data: openCountsByPriority,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Closed Incidents',
        data: closedCountsByPriority,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        <div className="Barcharts">
          <canvas id="barChartCanvas" />
          <BarChart data={BarData} />
          <div className="Linecharts">
            <canvas id="LineChartCanvas" />
            <LineChart data={LineData} />
            <div className="Piecharts">
              <canvas id="PieChartCanvas" />
              <Pie data={PieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
