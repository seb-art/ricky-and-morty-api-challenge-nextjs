// LocationCard.tsx
import { useState, useEffect } from 'react';
import Modal from './Modal';
import Link from 'next/link';

const LocationCard: React.FC<{ location: any }> = ({ location }) => {
  const [showResidents, setShowResidents] = useState(false);
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 4; // Display 4 residents per page

  const fetchResidents = async (urls: string[]) => {
    setLoading(true);
    try {
      const promises = urls.map(url => fetch(url).then(res => res.json()));
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
      fetchResidents(location.residents.slice(0, 20)); // Limiting to first 20 for performance
    }
  }, [showResidents, location.residents]);

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(residents.length / residentsPerPage);
  const pages = [...Array(totalPages).keys()].map(num => num + 1); // Create an array of page numbers

  const toggleResidentsModal = () => {
    setShowResidents(!showResidents);
    setCurrentPage(1); // Reset to first page when re-opened
  };

  return (
    <>
      <div className="bg-location-card p-4 rounded-lg shadow-md cursor-pointer" onClick={toggleResidentsModal}>
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
              <>
                <ul>
                  {currentResidents.map((resident, index) => (
                    <li key={index} className="resident-card bg-location-card p-4 rounded-lg shadow-md flex items-center mb-2">
                      <Link href={`/resident/${resident.id}`}>
                        <img src={resident.image} alt={resident.name} className="w-10 h-10 rounded-full mr-2 cursor-pointer" />
                      </Link>
                      <div>
                        <p className="font-bold text-navy">{resident.name}</p>
                        <p className="text-sm text-navy">Status: {resident.status}</p>
                        <p className="text-sm text-navy">Episodes: {resident.episode.length}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination flex justify-center mt-20">
                  {pages.map(page => (
                    <button 
                      key={page} 
                      onClick={() => paginate(page)} 
                      className={`page ${currentPage === page ? 'bg-red-500 text-white' : 'bg-location-card text-navy'} mr-4`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default LocationCard;