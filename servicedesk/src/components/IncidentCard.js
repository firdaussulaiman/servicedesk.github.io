import {Link }  from 'react-router-dom';
import supabase from '../config/supabaseClient'

const IncidentCard = ({incident, onDelete}) =>{
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('IncidentList')
            .delete()
            .eq('id', incident.id)
            .select()

            if (error) {
                console.log(error);
            }
            if (data) {
                console.log(data);
                onDelete(incident.id);
            }   
    }
    return (
        <div className="incident-card">
      
            <Link to={'/' + incident.id}>
                <i className='material-icons'>edit </i>
                
                </Link>
                <i className='material-icons' onClick={handleDelete}>delete </i>
                

            </div>
     
    )
}

export default IncidentCard;
