import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import CityList from './CityList';
import WeatherCard from './WeatherCard';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const { 
    loginWithRedirect, 
    logout, 
    isAuthenticated, 
    isLoading, 
    user
  } = useAuth0();

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 relative overflow-hidden">
        {/* Animated weather elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 text-6xl animate-float opacity-20">☁️</div>
          <div className="absolute top-40 right-32 text-4xl animate-bounce opacity-30" style={{animationDelay: '1s'}}>🌤️</div>
          <div className="absolute bottom-32 left-32 text-5xl animate-pulse opacity-25">🌧️</div>
          <div className="absolute bottom-20 right-20 text-3xl animate-float opacity-20" style={{animationDelay: '2s'}}>❄️</div>
          <div className="absolute top-1/2 left-1/4 text-7xl animate-bounce opacity-15" style={{animationDelay: '0.5s'}}>☀️</div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center border border-white/20 relative z-10 max-w-md w-full mx-4">
          <div className="text-6xl mb-6 animate-float">🌦️</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Weather App
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Discover weather conditions around the world
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="auth-button w-full text-lg py-4"
          >
            🔐 Sign In to Continue
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Get real-time weather updates for cities worldwide
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-float">🌦️</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Weather App
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Welcome back,</div>
                <div className="font-semibold text-gray-700">{user?.name}</div>
              </div>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Choose Your City</h2>
            <p className="text-gray-600">Select a city to view current weather conditions</p>
          </div>
          <CityList onCitySelect={handleCitySelect} />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <div className="text-xl text-gray-600">Loading weather data...</div>
          </div>
        )}

        {weather && !loading && (
          <div className="max-w-lg mx-auto">
            <WeatherCard weather={weather} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;