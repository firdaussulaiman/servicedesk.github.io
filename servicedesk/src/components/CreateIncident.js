import React, { useState } from 'react';
import supabase from '../config/supabaseClient';

const CreateIncident = () => {
const [incidentName, setIncidentName] = useState('');
const [incidentDescrp, setIncidentDesrp] = useState('');
const [incidentPriority, setincidentPriority] = useState('');
const [incidentStatus, setincidentStatus] = useState('');
const [incidentDate, setincidentDate] = useState('');
const [formErrors, setFormErrors] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incidentName || !incidentDescrp || !incidentPriority || !incidentStatus || !incidentDate) {
        setFormErrors('Please enter all fields');
    return 
    }

    const {data,error} = await supabase
    .from('incidents')
    .insert([{incidentName,incidentDescrp,incidentPriority,incidentStatus,incidentDate}]);
    
    if (error) {
        console.log(error);
        setFormErrors('Please enter all fields');
    }
    if (data) {
        console.log(data);
        setFormErrors(null);
     
    }

}
return (
        <div className="create">
            <h2>Create Incident</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='incident'>Incident Name:</label>
                <input 
                type="text"
                id="incident"
                value={incidentName}
                onChange={(e) => setIncidentName(e.target.value)}
                />
                <label htmlFor='incidentDescrp'>Incident Description:</label>
                <input 
                type="text"
                id="incidentDescrp"
                value={incidentDescrp}
                onChange={(e) => setIncidentDesrp(e.target.value)}
                />
                <label htmlFor='incidentPriority'>Incident Priority:</label>
                <select
                name="incidentPriority"
                id="incidentPriority"
                value={incidentPriority}
                onChange={(e) => setincidentPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
                <label htmlFor='incidentStatus'>Incident Status:</label>
                <select
                name="incidentStatus"
                id="incidentStatus"
                value={incidentStatus}
                onChange={(e) => setincidentStatus(e.target.value)}
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
              <label htmlFor='incidentDate'>Incident Date:</label>
                <input
                type="date"
                id="incidentDate"
                value={incidentDate}
                onChange={(e) => setincidentDate(e.target.value)}
                />
                <button>Add Incident</button>
                {formErrors && <p className="error">{formErrors}</p>}
            </form>
             
           
        </div>
    );
}


export default CreateIncident;