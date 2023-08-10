

import { Route,Routes} from 'react-router-dom';
import Home from './Pages/Home';
import CreateIncident from './Pages/CreateIncident';
import UpdateIncident from './Pages/UpdateIncident';
import IncidentTable from './Pages/IncidentTable';

//components
import LandingPage from "./Pages/LandingPage"

function App() {
  return (
    <div className="App">
    

<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateIncident />} />
        <Route path="/:id" element={<UpdateIncident />} />
        <Route path="/IncidentTable" element={<IncidentTable />} />
      </Routes>
    </div>
  );
}

export default App;