import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

// Components
import IncidentCard from '../components/IncidentCard';
import IncidentTable from '../components/IncidentTable';


const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [incidentList, setIncidentList] = useState(null);
  const [orderBy, setOrderBy] = useState('IncidentDate');
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(10);


  
  const countIncidentsByStatusAndPriority = (data, status, priority) => {
    return data.filter(
      (incident) =>
        incident.IncidentStatus === status &&
        incident.IncidentPriority === priority
    ).length;
  };
  

  const handleDelete = (incidentId) => {
    setIncidentList((prevIncidentList) => {
      return prevIncidentList.filter((incident) => incident.id !== incidentId);
    });
  };
  



  useEffect(() => {
    const fetchIncidentList = async () => {
      try {
        const { data, error } = await supabase
          .from('IncidentList')
          .select()
          .order(orderBy, { ascending: false });

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
  }, [orderBy]);
  

  console.log('IncidentList:', incidentList);
  console.log('Current orderBy:', orderBy);

  const priorityLevels = ['low', 'medium', 'high', 'critical'];
  const openCountsByPriority = priorityLevels.map((priority) =>
    incidentList ? countIncidentsByStatusAndPriority(incidentList, 'open', priority) : 0
  );
  const closedCountsByPriority = priorityLevels.map((priority) =>
    incidentList ? countIncidentsByStatusAndPriority(incidentList, 'closed', priority) : 0
  );

  // Calculate the number of pages needed
  const totalPages = Math.ceil(incidentList?.length / incidentsPerPage);

  // Calculate indexes for pagination
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get the incidents for the current page
  const currentIncidents = incidentList
  ? incidentList.slice(indexOfFirstIncident, indexOfLastIncident)
  : [];


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
  

  return (
    <div className="home">
      {fetchError && <p>{fetchError}</p>}
      {incidentList && (
        <div className="IncidentList">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('IncidentDate')}>Date</button>
            <button onClick={() => setOrderBy('IncidentPriority')}>Priority</button>
            <button onClick={() => setOrderBy('IncidentStatus')}>Status</button>
          </div>
          <IncidentTable incidents={currentIncidents} onDelete={handleDelete} />
        </div>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
      <div className="BarChart">
        <div style={{ width: 700 }}>
          <Bar data={BarData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
        <div style={{ width: 700 }}>
          <Line data={LineData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
