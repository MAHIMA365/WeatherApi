# Weather Information App - Complete Full Stack Solution

A modern, responsive weather application built with .NET 8 Web API backend and React + Vite frontend, featuring Auth0 authentication and real-time weather data from OpenWeatherMap API.

## 🌟 Features

### Backend (.NET 8 Web API)
- ✅ **OpenWeatherMap Integration** - Real-time weather data
- ✅ **5-minute Memory Caching** - Optimized API performance
- ✅ **Clean Architecture** - Controllers → Services → Data layers
- ✅ **CORS Support** - React frontend integration
- ✅ **Swagger Documentation** - Interactive API testing
- ✅ **Error Handling & Logging** - Comprehensive error management
- ✅ **Auth0 JWT Ready** - Authentication infrastructure prepared
- ✅ **Entity Framework Core** - Database integration ready

### Frontend (React + Vite)
- ✅ **Auth0 Authentication** - Secure login/logout with MFA support
- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **Interactive Weather Cards** - Temperature-based gradients
- ✅ **Animated UI Elements** - Smooth transitions and effects
- ✅ **City Selection Grid** - Beautiful city icons and hover effects
- ✅ **Real-time Data** - Live weather updates with caching
- ✅ **Weather-themed Login** - Animated background elements

## 🏗️ Project Structure

```
WeatherApi/
├── WeatherApi/                    # Backend (.NET 8 Web API)
│   ├── Controllers/
│   │   └── WeatherController.cs   # API endpoints
│   ├── Services/
│   │   └── WeatherService.cs      # Business logic & OpenWeatherMap integration
│   ├── Data/
│   │   ├── cities.json           # City data (8 cities worldwide)
│   │   └── ApplicationDbContext.cs # EF Core context
│   ├── WeatherModels.cs          # Data models
│   ├── Program.cs                # DI configuration & middleware
│   ├── appsettings.json          # Configuration
│   └── WeatherApi.csproj         # Project dependencies
│
├── weather-frontend/             # Frontend (React + Vite)
│   ├── src/
│   │   ├── AuthProvider.jsx      # Auth0 provider wrapper
│   │   ├── Home.jsx             # Main application component
│   │   ├── CityList.jsx         # City selection with animations
│   │   ├── WeatherCard.jsx      # Weather display with gradients
│   │   ├── HomeNoAuth.jsx       # Testing version without auth
│   │   ├── App.jsx              # Root component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Tailwind CSS + custom animations
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   ├── tailwind.config.js       # Tailwind configuration
│   └── vite.config.js           # Vite configuration
│
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **OpenWeatherMap API Key** - [Get free key](https://openweathermap.org/api)
- **Auth0 Account** - [Sign up free](https://auth0.com/)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd WeatherApi/WeatherApi

# Restore dependencies
dotnet restore

# Update appsettings.json with your OpenWeatherMap API key
# Replace "905772c66f1efebc4c38a316fb6af8e3" with your actual key

# Run the backend
dotnet run
```

**Backend will run on:** `https://localhost:5190` or `http://localhost:5190`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd weather-frontend

# Install dependencies
npm install

# Configure environment variables
# Update .env file with your values:
```

**Create/Update `.env` file:**
```env
VITE_API_URL=http://localhost:5190/api
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

```bash
# Run the frontend
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

### 3. Auth0 Configuration

1. **Create Auth0 Application:**
   - Go to [Auth0 Dashboard](https://manage.auth0.com)
   - Create new "Single Page Application"
   - Note your Domain and Client ID

2. **Configure Application Settings:**
   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`

3. **Update Frontend .env:**
   - Replace placeholder values with your Auth0 credentials

## 🔧 Configuration

### Backend Configuration (appsettings.json)
```json
{
  "OpenWeatherMap": {
    "ApiKey": "YOUR_OPENWEATHERMAP_API_KEY"
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

### Frontend Configuration (.env)
```env
VITE_API_URL=http://localhost:5190/api
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

## 📡 API Endpoints

### Weather Controller
- **GET** `/api/weather/cities` - Returns all available cities
- **GET** `/api/weather/{cityId}` - Returns weather data for specific city

### Example Responses

**Cities Endpoint:**
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

**Weather Endpoint:**
```json
{
  "name": "Colombo",
  "weather": [
    {
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "main": {
    "temp": 30.2,
    "feels_Like": 32.1,
    "humidity": 65,
    "pressure": 1013
  }
}
```

## 🎨 UI Features

### Weather-Themed Design
- **Gradient Backgrounds** - Temperature-based color schemes
- **Animated Elements** - Floating weather icons and smooth transitions
- **Glassmorphism Effects** - Modern backdrop blur styling
- **Responsive Grid** - Adaptive city selection layout
- **Interactive Cards** - Hover effects and scale animations

### City Icons
- 🏝️ Colombo - Tropical island
- 🏙️ Tokyo - Modern cityscape
- ⚽ Liverpool - Football city
- 🗼 Paris - Eiffel Tower
- 🏄 Sydney - Surfing culture
- 🦞 Boston - Lobster city
- 🏢 Shanghai - Business district
- ❄️ Oslo - Winter city

## 🔒 Security Features

### Authentication
- **Auth0 Integration** - Industry-standard authentication
- **JWT Tokens** - Secure API communication
- **Protected Routes** - Authentication-required access
- **MFA Ready** - Multi-factor authentication support

### API Security
- **CORS Configuration** - Controlled cross-origin requests
- **Error Handling** - Secure error responses
- **Input Validation** - Request parameter validation

## 🛠️ Development

### Backend Development
```bash
# Watch mode for development
dotnet watch run

# Build for production
dotnet build --configuration Release

# Run tests (when implemented)
dotnet test
```

### Frontend Development
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Dependencies

### Backend (.NET 8)
- **Microsoft.Extensions.Caching.Memory** - In-memory caching
- **Swashbuckle.AspNetCore** - Swagger documentation
- **Microsoft.EntityFrameworkCore.SqlServer** - Database integration
- **Microsoft.AspNetCore.Authentication.JwtBearer** - JWT authentication

### Frontend (React + Vite)
- **@auth0/auth0-react** - Auth0 authentication
- **axios** - HTTP client
- **tailwindcss** - Utility-first CSS framework
- **react** - UI library
- **vite** - Build tool

## 🌍 Supported Cities

The application includes weather data for 8 major cities worldwide:
1. **Colombo, Sri Lanka** (ID: 1248991)
2. **Tokyo, Japan** (ID: 1850147)
3. **Liverpool, UK** (ID: 2644210)
4. **Paris, France** (ID: 2988507)
5. **Sydney, Australia** (ID: 2147714)
6. **Boston, USA** (ID: 4930956)
7. **Shanghai, China** (ID: 1796236)
8. **Oslo, Norway** (ID: 3143244)

## 🚀 Deployment

### Backend Deployment
- **Azure App Service** - Recommended for .NET applications
- **Docker** - Containerized deployment
- **IIS** - Windows server deployment

### Frontend Deployment
- **Vercel** - Recommended for React applications
- **Netlify** - Static site hosting
- **Azure Static Web Apps** - Microsoft cloud integration

## 🔧 Troubleshooting

### Common Issues

**Backend not starting:**
- Check if port 5190 is available
- Verify .NET 8 SDK installation
- Check appsettings.json configuration

**Frontend API errors:**
- Verify backend is running
- Check CORS configuration
- Confirm API URL in .env file

**Auth0 login issues:**
- Verify Auth0 domain and client ID
- Check callback URLs configuration
- Ensure application type is "Single Page Application"

**Weather data not loading:**
- Verify OpenWeatherMap API key
- Check network connectivity
- Review browser console for errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Verify all configuration settings
- Ensure all dependencies are installed

---

**Built with ❤️ using .NET 8, React, and modern web technologies**
