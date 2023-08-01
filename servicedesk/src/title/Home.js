import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'

//components
import IncidentCard from '../components/IncidentCard';

const Home = () => {
    const [fetchError,setFetchError] = useState(null);
    const [IncidentList,setIncidentList] = useState(null);
    const [orderBy, setOrderBy] = useState('IncidentDate');
    
    const handleDelete = (id) => {
        setIncidentList(prevIncidentList =>{
            return prevIncidentList.filter(incident => incident.id !== id);
        })
    }

    useEffect(() => {
        const fetchIncidentList = async () => {
          try {
            const { data, error } = await supabase
              .from('IncidentList')
              .select()
              .order(orderBy, { ascending: false});
      
            console.log('Data:', data);
            console.log('Error:', error);
            console.log('Current orderBy:', orderBy);
      
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
      
console.log('IncidentList:', IncidentList); 
console.log('Current orderBy:', orderBy);

    return (
        <div className="home">
            {fetchError && (<p>{fetchError}</p>)}
            {IncidentList && (
   <div className="IncidentList">
  <div className='order-by'>
    <p>Order by:</p>
    <button onClick={() => setOrderBy('IncidentDate')}>Date</button>
    <button onClick={() => setOrderBy('IncidentPriority')}>Priority</button>
    <button onClick={() => setOrderBy('IncidentStatus')}>Status</button>
    {orderBy}
    </div>
<div className="Incident-grid">
{IncidentList.map(incident => (
        <IncidentCard key={incident.id} incident={incident} onDelete={handleDelete}/>
   
      ))}
   </div>

        </div>
            )}

        </div>
    )
}       
            


  export default Home;