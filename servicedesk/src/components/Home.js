import supabase from '../config/supabaseClient'

const Home = () => {
    console.log(supabase)
    return (
        <div className="home">
            <h2>Incident List</h2>
            <div className="incident-list">
                <div className="incident-preview">
                    <h2>Incident Name</h2>
                    <p>Incident Description</p>
                    <p>Incident Priority</p>
                    <p>Incident Status</p>
                    <p>Incident Date</p>
                </div>
                </div>
        </div>
    );  
}

  export default Home;