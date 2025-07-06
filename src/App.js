import React, { useState } from 'react';
import dayjs from 'dayjs';

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

  return (
    <div className="container">
      <h1>Duration Calculator</h1>
      <label>Start Date & Time</label>
      <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />

      <label>End Date & Time</label>
      <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />

      <div className="result">
        <strong>Duration:</strong> {calculateDuration() || 'Please enter both dates.'}
      </div>
    </div>
  );
}

export default App;