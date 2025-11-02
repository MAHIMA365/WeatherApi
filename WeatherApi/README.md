# Weather API - .NET 8 Backend

A complete .NET 8 Web API backend for a weather information application that integrates with OpenWeatherMap API.

## Features

- ✅ Reads city codes from `Data/cities.json`
- ✅ Fetches weather data from OpenWeatherMap API
- ✅ 5-minute in-memory caching per city
- ✅ REST endpoints for React frontend
- ✅ Clean architecture (Controllers → Services → Data)
- ✅ CORS enabled for React frontend
- ✅ Swagger documentation
- ✅ Error handling and logging
- ✅ Auth0 JWT integration ready (commented placeholders)

## API Endpoints

### GET /api/weather/cities
Returns all available cities from the JSON file.

**Response:**
```json
[
  {
    "cityCode": "1248991",
    "cityName": "Colombo",
    "temp": "33.0",
    "status": "Clouds"
  }
]
```

### GET /api/weather/{cityId}
Returns current weather data for a specific city.

**Response:**
```json
{
  "name": "Cairns",
  "weather": [
    {
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 30.2,
    "feels_Like": 32.1,
    "temp_Min": 28.5,
    "temp_Max": 31.8,
    "pressure": 1013,
    "humidity": 65
  },
  "id": 2172797
}
```

## Configuration

### appsettings.json
```json
{
  "OpenWeatherMap": {
    "ApiKey": "YOUR_API_KEY_HERE"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=WeatherDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Auth0": {
    "Authority": "https://YOUR_AUTH0_DOMAIN",
    "Audience": "YOUR_AUTH0_API_IDENTIFIER"
  }
}
```

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   dotnet restore
   ```

2. **Configure OpenWeatherMap API Key:**
   - Get your API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Update `appsettings.json` with your API key

3. **Run the Application:**
   ```bash
   dotnet run
   ```

4. **Access Swagger UI:**
   - Navigate to `https://localhost:7xxx/swagger` (port may vary)

## Architecture

```
WeatherApi/
├── Controllers/
│   └── WeatherController.cs      # API endpoints
├── Services/
│   └── WeatherService.cs         # Business logic & API calls
├── Data/
│   ├── cities.json              # City data
│   └── ApplicationDbContext.cs   # EF Core context (placeholder)
├── Program.cs                   # DI configuration & middleware
└── appsettings.json            # Configuration
```

## Caching

- **Strategy:** In-memory caching
- **Duration:** 5 minutes per city
- **Key Format:** `weather_{cityId}`

## CORS Configuration

Configured for React frontend running on `http://localhost:5173`. Update the CORS policy in `Program.cs` if your frontend runs on a different port.

## Auth0 Integration (Ready for Setup)

The application includes commented placeholders for Auth0 JWT authentication. To enable:

1. Uncomment the JWT configuration in `Program.cs`
2. Add your Auth0 domain and audience to `appsettings.json`
3. Uncomment the authentication middleware

## Database Integration (Placeholder)

Entity Framework Core is configured with SQL Server support. The `ApplicationDbContext` includes placeholder entities for future features like user management and weather request logging.

## Error Handling

- Comprehensive try-catch blocks in services
- Structured logging with different log levels
- Graceful API error responses
- Cache fallback on API failures

## Development

- **Framework:** .NET 8
- **Dependencies:** Memory Caching, Swagger, EF Core, JWT Bearer
- **Logging:** Built-in ASP.NET Core logging
- **Testing:** Ready for unit test integration