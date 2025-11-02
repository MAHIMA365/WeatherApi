import { useState, useEffect } from 'react';
import axios from 'axios';

const HomeNoAuth = () => {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/cities`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCitySelect = async (cityCode) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/${cityCode}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Weather App</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select a City</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <button
                key={city.cityCode}
                onClick={() => handleCitySelect(city.cityCode)}
                className="city-button"
              >
                {city.cityName}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="text-lg">Loading weather data...</div>
          </div>
        )}

        {weather && !loading && (
          <div className="max-w-md mx-auto">
            <div className="weather-card">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
                <div className="text-6xl mb-4">
                  {getWeatherIcon(weather.weather?.[0]?.description)}
                </div>
                <div className="text-4xl font-bold mb-2">
                  {Math.round(weather.main?.temp || 0)}°C
                </div>
                <p className="text-lg capitalize mb-4">
                  {weather.weather?.[0]?.description || 'No description'}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Feels like:</span>
                    <br />
                    {Math.round(weather.main?.feels_Like || 0)}°C
                  </div>
                  <div>
                    <span className="font-medium">Humidity:</span>
                    <br />
                    {weather.main?.humidity || 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeNoAuth;