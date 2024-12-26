import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SkeletonPokemonCard.scss';

const SkeletonPokemonCard = () => (
  <motion.div 
    className="skeleton-card"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="skeleton-image pulse" />
    <div className="skeleton-content">
      <div className="skeleton-title pulse" />
      <div className="skeleton-stats">
        <div className="skeleton-stat pulse" />
        <div className="skeleton-stat pulse" />
      </div>
    </div>
  </motion.div>
);

export default SkeletonPokemonCard;