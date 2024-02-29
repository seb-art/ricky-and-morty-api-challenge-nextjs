'use client'
// pages/index.tsx

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';

const Home: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/location');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      setLocations(data.results);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location: any) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;