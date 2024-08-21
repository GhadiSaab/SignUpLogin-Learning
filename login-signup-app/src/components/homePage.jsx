import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav className="navbar">
          <h2>List It</h2>
          <ul className="link">
            <li><button onClick={() => navigate("/")} className='todo'>Home</button></li>
            <li><button onClick={() => navigate("/todo")} className='todo'>To dos</button></li>
            <li><button onClick={() => navigate("/contactus")} className='todo'>Contact Us</button></li>
          </ul>
          <button className='login-btn'><Link to="/">Log out</Link></button>  
        </nav>
      </header>
    </>
  );
}

export default HomePage;
