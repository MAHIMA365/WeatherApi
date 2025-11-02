const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getGradientColor = (temp) => {
    if (temp < 0) return 'from-blue-400 to-blue-600';
    if (temp < 15) return 'from-cyan-400 to-blue-500';
    if (temp < 25) return 'from-green-400 to-teal-500';
    if (temp < 35) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const temp = Math.round(weather.main.temp);

  return (
    <div className="animate-slide-up">
      <div className={`relative overflow-hidden bg-gradient-to-br ${getGradientColor(temp)} rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-500`}>
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12 animate-bounce"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">{weather.name}</h2>
          
          <div className="text-8xl mb-6 animate-bounce">
            {getWeatherIcon(weather.weather[0].description)}
          </div>
          
          <div className="text-6xl font-bold mb-2 drop-shadow-lg">
            {temp}°C
          </div>
          
          <p className="text-xl capitalize mb-6 opacity-90">
            {weather.weather[0].description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl mb-1">🌡️</div>
              <div className="text-sm opacity-80">Feels like</div>
              <div className="font-semibold">{Math.round(weather.main.feels_Like)}°C</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">💧</div>
              <div className="text-sm opacity-80">Humidity</div>
              <div className="font-semibold">{weather.main.humidity}%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌬️</div>
              <div className="text-sm opacity-80">Pressure</div>
              <div className="font-semibold">{weather.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;