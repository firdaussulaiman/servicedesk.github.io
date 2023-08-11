import React, { useState } from 'react';
import {useNavigate }   from 'react-router-dom';
import supabase from '../config/supabaseClient';
import NavBar from './NavBar';


const CreateIncident = ( ) => {
const navigate = useNavigate();
const [IncidentName, setIncidentName] = useState('');
const [IncidentDescription, setIncidentDescription] = useState('');
const [IncidentPriority ,setIncidentPriority] = useState('');
const [IncidentStatus, setIncidentStatus] = useState('');
const [IncidentDate, setIncidentDate] = useState('');
const [formErrors, setFormErrors] = useState(null);



    const handleSubmit = async e => {
      e.preventDefault();
    
      if (!IncidentName || !IncidentDescription || !IncidentPriority || !IncidentStatus || !IncidentDate) {
        setFormErrors('Please enter all fields');
        return;
      }
    
      
        const { data, error } = await supabase.from('IncidentList').insert([
          { IncidentName, IncidentDescription, IncidentPriority, IncidentStatus, IncidentDate },
        ]);
    
        if (error) {
          console.log(error);
          setFormErrors('An error occurred while creating the incident');
        } else {
          console.log(data);
          setFormErrors(null);
          console.log('Incident created successfully');
          navigate('/');
        }
      };
      
    
return (
        <div className="create">

<NavBar />      


            <h2>Create Incident</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor='incident'>Incident Name:</label>
                <input 
                type="text"
                id="incident"
                value={IncidentName}
                onChange={(e) => setIncidentName(e.target.value)}
                />
                <label htmlFor='IncidentDescription'>Incident Description:</label>
                <input 
                type="text"
                id="IncidentDescription"
                value={IncidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                style={{ height: '100px' }} 
                />
                <label htmlFor='IncidentPriority'>Incident Priority:</label>
                <select
                name="IncidentPriority"
                id="IncidentPriority"
                value={IncidentPriority}
                onChange={(e) => setIncidentPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
                <label htmlFor='IncidentStatus'>Incident Status:</label>
                <select
                name="IncidentStatus"
                id="IncidentStatus"
                value={IncidentStatus}
                onChange={(e) => setIncidentStatus(e.target.value)}
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
              <label htmlFor='IncidentDate'>Incident Date:</label>
                <input
                type="date"
                id="IncidentDate"
                value={IncidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                />
                <button>Add Incident</button>
                {formErrors && <p className="error">{formErrors}</p>}
               
            </form>
        </div>
    );
}


export default CreateIncident;