import {BrowserRouter,Routes,Link} from 'react-router-dom';
import './App.css';

//components
import Home from './components/Home';
import CreateIncident from './components/CreateIncident';
import UpdateIncident from './components/UpdateIncident';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav> 
          <h1>Incident Management System</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create Incident</Link>
        </nav>
        <Routes>
          <Home path="/" element = {<Home/>}/>
          <CreateIncident path="/create" element = {<CreateIncident/>}/>
          <Incident path="/incident/:id" element = {<UpdateIncident/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
