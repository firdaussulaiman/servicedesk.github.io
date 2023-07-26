import { Routes,Route, Link } from "react-router-dom"
import './App.css';

//components
import Home from './components/Home';
import CreateIncident from './components/CreateIncident';
import UpdateIncident from './components/UpdateIncident';

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
          <Route path="/UpdateIncident/:id" element = {<UpdateIncident/>}/>
        </Routes>
    
    </div>
  );
}

export default App;
