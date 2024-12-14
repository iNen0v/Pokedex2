import React from 'react';
import { motion } from 'framer-motion';

function LoadMore({ loadMore, isLoading }) {
  return (
    <motion.button
      className="load-more-btn"
      onClick={loadMore}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </motion.button>
  );
}

export default LoadMore;