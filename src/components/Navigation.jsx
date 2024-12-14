import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navigation() {
  return (
    <motion.nav 
      className="nav-menu"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
    >
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <img src="/pokemon-logo.png" alt="Pokédex" />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navigation;