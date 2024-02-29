// components/LocationCard.tsx
import { useState, useEffect } from 'react';
import Modal from './Modal';

const LocationCard: React.FC<{ location: any }> = ({ location }) => {
  const [showResidents, setShowResidents] = useState(false);
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResidents = async (urls: string[]) => {
    setLoading(true);
    try {
      const promises = urls.map(url =>
        fetch(url).then(res => res.json())
      );
      const results = await Promise.all(promises);
      setResidents(results);
    } catch (error) {
      console.error("Failed to fetch residents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showResidents) {
      fetchResidents(location.residents);
    }
  }, [showResidents, location.residents]);

  const toggleResidentsModal = () => {
    setShowResidents(!showResidents);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={toggleResidentsModal}>
        <h2 className="text-xl font-bold">{location.name}</h2>
        <p className="text-gray-600">{location.type}</p>
      </div>
      {showResidents && (
        <Modal onClose={toggleResidentsModal}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Residents:</h3>
            {loading ? (
              <p>Loading residents...</p>
            ) : (
              <ul>
                {residents.map((resident, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <img src={resident.image} alt={resident.name} className="w-10 h-10 rounded-full mr-2" />
                    <div>
                      <p className="font-bold">{resident.name}</p>
                      <p className="text-sm">{resident.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default LocationCard;
