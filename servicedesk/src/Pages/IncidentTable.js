import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';

// Components
import IncidentTableCard from '../components/IncidentTableCard';

const IncidentTable = () => {
  const [fetchError, setFetchError] = useState(null);
  const [incidentList, setIncidentList] = useState(null);
  const [orderBy, setOrderBy] = useState('IncidentDate');
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(15);

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
  console.log('Current Incidents:', currentIncidents);

  return (

    <div className="IncidentTable">
      {fetchError && <p>{fetchError}</p>}
      {incidentList && (
        <div className="IncidentList">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('id')}>ID</button>
            <button onClick={() => setOrderBy('IncidentDate')}>Date</button>
            <button onClick={() => setOrderBy('IncidentPriority')}>Priority</button>
            <button onClick={() => setOrderBy('IncidentStatus')}>Status</button>
          </div>
          <IncidentTableCard incidents={currentIncidents} onDelete={handleDelete} />
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
   
      </div>
   
  );
};

export default IncidentTable;
