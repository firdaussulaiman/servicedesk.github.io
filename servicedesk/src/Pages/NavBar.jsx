import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
// Import these components as needed
import Home from './Home';
import CreateIncident from './CreateIncident';
import UpdateIncident from './UpdateIncident';
import IncidentTable from './IncidentTable';

const NavBar = () => {
  return (
    <>
      <nav>
        <h1>Incident Management System</h1>
        <Link to="/home">Home</Link>
        <Link to="/create">Create Incident</Link>
        <Link to="/IncidentTable">Incident List</Link>
      </nav>

      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/create" element={<CreateIncident />} />
        <Route path="/:id" element={<UpdateIncident />} />
        <Route path="/IncidentTable" element={<IncidentTable />} />
      </Routes>
    </>
  );
};

export default NavBar;
