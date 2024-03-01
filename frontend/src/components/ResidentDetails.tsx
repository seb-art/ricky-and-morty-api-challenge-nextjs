// components/ResidentDetails.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router

const ResidentDetails: React.FC = () => {
  const router = useRouter(); // Get the router object
  const { residentId } = router.query; // Access the residentId from router query

  // Check if residentId exists and is a string, then parse it as a number
  const parsedResidentId = typeof residentId === 'string' ? parseInt(residentId) : undefined;

  const [resident, setResident] = useState<any>(null);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (parsedResidentId) {
      // Fetch resident details from the API
      const fetchResidentDetails = async () => {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${parsedResidentId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch resident details');
          }
          const data = await response.json();
          setResident(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchResidentDetails();
    }
  }, [parsedResidentId]);

  useEffect(() => {
    // Retrieve notes from local storage
    const savedNotes = localStorage.getItem(`resident_${parsedResidentId}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [parsedResidentId]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const saveNotes = () => {
    // Save notes to local storage
    localStorage.setItem(`resident_${parsedResidentId}_notes`, notes);
    alert('Notes saved successfully!');
  };

  if (!resident) {
    return <p>Loading resident details...</p>;
  }

  return (
    <div>
      <h2>{resident.name}</h2>
      <p>Status: {resident.status}</p>
      <p>Species: {resident.species}</p>
      <p>Type: {resident.type}</p>
      <p>Gender: {resident.gender}</p>
      <p>Origin: {resident.origin.name}</p>
      <p>Location: {resident.location.name}</p>
      <div>
        <h3>Add Notes:</h3>
        <textarea value={notes} onChange={handleNotesChange} rows={4} cols={50}></textarea>
        <button onClick={saveNotes}>Save Notes</button>
      </div>
    </div>
  );
};

export default ResidentDetails;