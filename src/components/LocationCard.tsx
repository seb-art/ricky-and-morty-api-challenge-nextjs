const LocationCard: React.FC<{ location: any }> = ({ location }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">{location.name}</h2>
        <p className="text-gray-600 mb-4">{location.type}</p>
        <div>
          <h3 className="text-lg font-semibold mb-2">Residents:</h3>
          <ul>
            {location.residents.map((resident: any) => (
              <li key={resident.id} className="flex items-center mb-2">
                <img src={resident.image} alt={resident.name} className="w-8 h-8 rounded-full mr-2" />
                <span>{resident.name} - {resident.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default LocationCard;
  