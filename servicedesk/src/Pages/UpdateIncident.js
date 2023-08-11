import {useParams ,useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import supabase from "../config/supabaseClient"
import NavBar from "./NavBar.jsx";

const UpdateIncident = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);

const [IncidentName, setIncidentName] = useState('');
const [IncidentDescription, setIncidentDescription] = useState('');
const [IncidentPriority ,setIncidentPriority] = useState('');
const [IncidentStatus, setIncidentStatus] = useState('');
const [IncidentDate, setIncidentDate] = useState('');
const [formErrors, setFormErrors] = useState(null);

const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!IncidentName || !IncidentDescription || !IncidentPriority || !IncidentStatus|| !IncidentDate) {
        setFormErrors('Please enter all fields');
    return 
    }

    const{data,error} = await supabase
    .from('IncidentList')
    .update({IncidentName,IncidentDescription,IncidentPriority,IncidentStatus,IncidentDate})
    .eq('id',id)//filtering the data
    .select()//single row
    console.log('Data:', data);

    if (error) {
        setFormErrors('Please enter all fields');
    }
    if (data) {
        console.log(data);
        setFormErrors(null);
        console.log('Incident updated successfully');
        navigate('/home');
    }
}
    
    useEffect(() => {
        const fetchIncident = async () => {
            const {data,error} = await supabase
            .from('IncidentList')
            .select()
            .eq('id',id)//filtering the data
            .single()//single row
            console.log('Data:', data);

            if (error) {
                navigate("/home",{replace:true});
            }
            if(data) {
                console.log(data);
                setIncidentName(data.IncidentName);
                setIncidentDescription(data.IncidentDescription);
                setIncidentPriority(data.IncidentPriority);
                setIncidentStatus(data.IncidentStatus);
                setIncidentDate(data.IncidentDate);
                console.log(data.IncidentName);
            }

        }
        fetchIncident();
    },[id,navigate])
   


    return (
        <div>
        <NavBar/>
       
        <div className="Incident-Update">
        <h2>Update Incident</h2>
            <form onSubmit = {handleSubmit} >
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
                <button>Update Incident</button>

                {formErrors && <p className="error">{formErrors}</p>}
               
            </form>
 </div>
        </div>
    )
    }


export default UpdateIncident;