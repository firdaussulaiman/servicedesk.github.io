import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    navigate(`/home?name=${encodeURIComponent(name)}`);

  };

  return (
    <div className="landing-page-centered" style={{ border: '2px solid black' }}>
    <div className="landing-page">
      <h2>Welcome to the Incident Management System</h2>
      <div className="centered">
        <p>Please enter your name</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
           <div className="centered">
        <button type="submit">Submit</button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default LandingPage;
