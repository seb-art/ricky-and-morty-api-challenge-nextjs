'use client';
// pages/index.tsx
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';

enum SearchType {
  Location = 'Location',
  Resident = 'Resident',
}

const Home: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
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
      setFilteredLocations(data.results); // Initialize filtered locations with all locations
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string, searchType: SearchType) => {
    if (searchType === SearchType.Location) {
      const filtered = locations.filter((location: any) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else if (searchType === SearchType.Resident) {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch residents');
        }
        const data = await response.json();
        // Assuming the API response contains an array of characters
        setFilteredLocations(data.results);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location: any) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;