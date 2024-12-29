import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/PokemonNavigation.scss';

function PokemonNavigation({ currentId }) {
  const navigate = useNavigate();

  return (
    <div className="pokemon-navigation">
      {currentId > 1 && (
        <Link 
          to={`/pokemon/${currentId - 1}`} 
          className="nav-button prev"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/pokemon/${currentId - 1}`);
          }}
        >
          Previous
        </Link>
      )}
      <Link 
        to={`/pokemon/${currentId + 1}`} 
        className="nav-button next"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/pokemon/${currentId + 1}`);
        }}
      >
        Next
      </Link>
    </div>
  );
}

export default PokemonNavigation;