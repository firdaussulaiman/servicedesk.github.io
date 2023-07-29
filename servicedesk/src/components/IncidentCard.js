const IncidentCard = ({incident}) =>{
    return (
        <div className="incident-card">
            <h3>{incident.IncidentName}</h3>
            <p>{incident.IncidentDescription}</p>
            <p>{incident.IncidentPriority}</p>
            <p>{incident.IncidentStatus}</p>
           <div className="IncidentDate">{incident.IncidentDate}</div>
            </div>
    )
}

export default IncidentCard;
