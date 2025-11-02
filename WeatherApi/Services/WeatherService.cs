using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;
    private readonly IConfiguration _config;
    private readonly ILogger<WeatherService> _logger;

    public WeatherService(HttpClient httpClient, IMemoryCache cache, IConfiguration config, ILogger<WeatherService> logger)
    {
        _httpClient = httpClient;
        _cache = cache;
        _config = config;
        _logger = logger;
    }

    public async Task<WeatherResponse?> GetWeatherByCityIdAsync(int cityId)
    {
        string cacheKey = $"weather_{cityId}";

        if (_cache.TryGetValue(cacheKey, out WeatherResponse? cachedData))
        {
            _logger.LogInformation("Weather data for city {CityId} retrieved from cache", cityId);
            return cachedData;
        }

        try
        {
            string? apiKey = _config["OpenWeatherMap:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogError("OpenWeatherMap API key is not configured");
                return null;
            }

            string url = $"https://api.openweathermap.org/data/2.5/weather?id={cityId}&appid={apiKey}&units=metric";
            
            var response = await _httpClient.GetAsync(url);
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning("OpenWeatherMap API returned {StatusCode} for city {CityId}", response.StatusCode, cityId);
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();
            var weatherData = JsonSerializer.Deserialize<WeatherResponse>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (weatherData != null)
            {
                _cache.Set(cacheKey, weatherData, TimeSpan.FromMinutes(5));
                _logger.LogInformation("Weather data for city {CityId} cached for 5 minutes", cityId);
            }

            return weatherData;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error while fetching weather data for city {CityId}", cityId);
            return null;
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON deserialization error for city {CityId}", cityId);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error while fetching weather data for city {CityId}", cityId);
            return null;
        }
    }
}

public class WeatherResponse
{
    public string Name { get; set; } = string.Empty;
    public List<WeatherInfo> Weather { get; set; } = new();
    public MainWeatherData Main { get; set; } = new();
    public int Id { get; set; }
}

public class WeatherInfo
{
    public string Main { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
}

public class MainWeatherData
{
    public double Temp { get; set; }
    public double Feels_Like { get; set; }
    public double Temp_Min { get; set; }
    public double Temp_Max { get; set; }
    public int Pressure { get; set; }
    public int Humidity { get; set; }
}
