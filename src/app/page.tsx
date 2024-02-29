// pages/index.tsx

import { useState } from 'react';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';
import { useLocationsQuery } from '../hooks/useLocationsQuery';

const Home: React.FC = () => {
  const { loading, error, data } = useLocationsQuery();
  const [locations, setLocations] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.locations.map((location: any) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
