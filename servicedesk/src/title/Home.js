import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'

//components
import IncidentCard from '../components/IncidentCard';

const Home = () => {
    const [fetchError,setFetchError] = useState(null);
    const [IncidentList,setIncidentList] = useState(null);

    useEffect(() => {
   const fetchIncidentList = async () => {
         const {data,error} = await supabase
         .from('IncidentList')
         .select()

         console.log('Data:', data);
         console.log('Error:', error);

         if (error) {
              setFetchError('An error occured while fetching data');
              setIncidentList(null);
              console.log(error);
         }
         if (data) {
              setIncidentList(data);
              setFetchError(null);
         }
        }
        fetchIncidentList();
    },[])
console.log('IncidentList:', IncidentList); 
    return (
        <div className="home">
            {fetchError && (<p>{fetchError}</p>)}
            {IncidentList && (
   <div className="IncidentList">
    {/* order by buttons*/}
<div className="Incident-grid">
{IncidentList.map(incident => (
        <IncidentCard key={incident.id} incident={incident}/>
   
      ))}
   </div>

        </div>
            )}

        </div>
    )
}       
            


  export default Home;