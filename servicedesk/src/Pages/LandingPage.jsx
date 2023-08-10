import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`/home?name=${encodeURIComponent(name)}`);

  };

  return (
    <div className="landing-page">
      <h2>Welcome to the Incident Management System</h2>
      <p>Please enter your name to continue:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button  type="submit"> Submit </button>
       
      </form>
    </div>
  );
};

export default LandingPage;
