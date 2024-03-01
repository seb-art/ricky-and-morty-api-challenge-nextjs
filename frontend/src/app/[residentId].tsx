// pages/[residentId].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ResidentDetailsPage: React.FC = () => {
  const router = useRouter();
  const { residentId } = router.query;
  const [resident, setResident] = useState<any>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchResidentDetails = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${residentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch resident details');
        }
        const data = await response.json();
        setResident(data);
      } catch (error) {
        console.error('Error fetching resident details:', error);
      }
    };

    if (residentId) {
      fetchResidentDetails();
    }
  }, [residentId]);

  const handleSaveNotes = () => {
    localStorage.setItem(`resident_${residentId}_notes`, notes);
    // Optionally, you can show a confirmation message or navigate back to the previous page
  };

  return (
    <div>
      {resident && (
        <>
          <h1>{resident.name}</h1>
          <img src={resident.image} alt={resident.name} />
          <p>Status: {resident.status}</p>
          <p>Species: {resident.species}</p>
          {/* Add more details as needed */}
        </>
      )}

      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button onClick={handleSaveNotes}>Save Notes</button>
    </div>
  );
};

export default ResidentDetailsPage;
