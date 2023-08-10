import React from 'react';
import supabase from '../config/supabaseClient';
import IncidentCard from './IncidentCard'; // Import the IncidentCard component
import { useNavigate } from 'react-router-dom';
import NavBar from '../Pages/NavBar';
const IncidentTableCard = ({ incidents, onDelete }) => {
  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('IncidentList')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(id);
    }
  };

  return (
    <div>
      <NavBar />
  <div/>
    <div className="TableofIncidents">
    
      <table>
        <thead>
          <tr>
            <th>Incident ID</th>
            <th>Incident Name</th>
            <th>Incident Description</th>
            <th>Incident Priority</th>
            <th>Incident Status</th>
            <th>Incident Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.IncidentName}</td>
              <td>{incident.IncidentDescription}</td>
              <td>{incident.IncidentPriority}</td>
              <td>{incident.IncidentStatus}</td>
              <td>{incident.IncidentDate}</td>
              <td>
                <IncidentCard incident={incident} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default IncidentTableCard;
