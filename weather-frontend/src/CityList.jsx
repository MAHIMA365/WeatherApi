import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const CityList = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCities();
    }
  }, [isAuthenticated]);

  const fetchCities = async () => {
    console.log('Fetching cities from:', `${import.meta.env.VITE_API_URL}/weather/cities`);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/cities`);
      console.log('Cities response:', response.data);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading cities...</div>;
  }

  console.log('Cities array:', cities);
  console.log('Cities length:', cities.length);

  const getCityIcon = (cityName) => {
    const icons = {
      'Colombo': '🏝️', 'Tokyo': '🏙️', 'Liverpool': '⚽', 'Paris': '🗼',
      'Sydney': '🏄', 'Boston': '🦞', 'Shanghai': '🏢', 'Oslo': '❄️'
    };
    return icons[cityName] || '🌍';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {cities.length === 0 ? (
        <div className="col-span-full text-center text-red-500 p-8">
          <div className="text-4xl mb-2">😔</div>
          <div>No cities loaded. Check console for errors.</div>
        </div>
      ) : (
        cities.map((city, index) => (
          <button
            key={city.cityCode}
            onClick={() => onCitySelect(city.cityCode)}
            className="group relative bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-2xl mb-2">{getCityIcon(city.cityName)}</div>
            <div className="text-sm">{city.cityName}</div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
          </button>
        ))
      )}
    </div>
  );
};

export default CityList;