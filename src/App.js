import React, { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const calculateDuration = () => {
    if (!start || !end) return null;

    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (endDate.isBefore(startDate)) return 'End date/time must be after start.';

    const diffInHours = endDate.diff(startDate, 'hour');
    const diffInDays = Math.floor(diffInHours / 24);
    const remainingHours = diffInHours % 24;

    return `${diffInHours} hours total (${diffInDays} day(s) ${remainingHours} hour(s))`;
  };

  const result = calculateDuration();

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>⏱ Duration Calculator</h1>
      <label>Start Date & Time</label>
      <motion.input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      <label>End Date & Time</label>
      <motion.input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      <AnimatePresence>
        {result && (
          <motion.div
            className="result"
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <strong>Duration:</strong> {result}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;