import React, { useState } from 'react';
import { Button } from '../../components/common/Button';

export const BookingForm = ({ providerId, onSubmit }) => {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ providerId, date, notes });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>Service Date:</label><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
      </div>
      <div>
        <label>Notes for Provider:</label><br />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" style={{ width: '100%', padding: '0.5rem' }}></textarea>
      </div>
      <Button type="submit">Confirm Booking</Button>
    </form>
  );
};