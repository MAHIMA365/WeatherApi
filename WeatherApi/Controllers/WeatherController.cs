using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly WeatherService _weatherService;
    private readonly ILogger<WeatherController> _logger;

    public WeatherController(WeatherService weatherService, ILogger<WeatherController> logger)
    {
        _weatherService = weatherService;
        _logger = logger;
    }

    [HttpGet("{cityId}")]
    public async Task<IActionResult> GetWeather(int cityId)
    {
        try
        {
            var weather = await _weatherService.GetWeatherByCityIdAsync(cityId);
            if (weather == null) return NotFound($"Weather data not found for city ID: {cityId}");
            return Ok(weather);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching weather for city ID: {CityId}", cityId);
            return StatusCode(500, "Internal server error while fetching weather data");
        }
    }

    [HttpGet("cities")]
    public IActionResult GetCities()
    {
        try
        {
            var jsonContent = System.IO.File.ReadAllText("Data/cities.json");
            var citiesData = JsonSerializer.Deserialize<CitiesResponse>(jsonContent);
            return Ok(citiesData?.List ?? new List<City>());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reading cities data");
            return StatusCode(500, "Internal server error while fetching cities data");
        }
    }
}

public class CitiesResponse
{
    public List<City> List { get; set; } = new();
}

public class City
{
    public string CityCode { get; set; } = string.Empty;
    public string CityName { get; set; } = string.Empty;
    public string? Temp { get; set; }
    public string? Status { get; set; }
}
