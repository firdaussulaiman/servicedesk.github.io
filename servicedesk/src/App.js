import { Routes,Route, Link } from "react-router-dom"
import './App.css';

//components
import Home from './title/Home';
import Dashboard from './title/dashboard';
import CreateIncident from './title/CreateIncident';
import UpdateIncident from './title/UpdateIncident';

function App() {
  return (
    <div className="App">
    
        <nav> 
          <h1>Incident Management System</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create Incident</Link>
        </nav>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/create" element = {<CreateIncident/>}/>
          <Route path="/:id" element = {<UpdateIncident/>}/>
        </Routes>
    
    </div>
  );
}

export default App;
