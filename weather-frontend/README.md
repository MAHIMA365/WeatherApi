# Weather Frontend - React + Vite + Auth0

A responsive React frontend for the Weather API with Auth0 authentication.

## Features

- ✅ Auth0 authentication with login/logout
- ✅ Protected routes and API calls
- ✅ Responsive design with Tailwind CSS
- ✅ City selection and weather display
- ✅ Real-time weather data from backend API
- ✅ Mobile-friendly interface

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Update `.env` with your actual values:
```env
VITE_API_URL=https://localhost:7000/api
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### 3. Auth0 Configuration
1. Create an Auth0 application (Single Page Application)
2. Set allowed callback URLs: `http://localhost:5173`
3. Set allowed logout URLs: `http://localhost:5173`
4. Set allowed web origins: `http://localhost:5173`
5. Update `.env` with your Auth0 credentials

### 4. Run the Application
```bash
npm run dev
```

## Project Structure

```
src/
├── AuthProvider.jsx     # Auth0 provider wrapper
├── Home.jsx            # Main application component
├── CityList.jsx        # City selection component
├── WeatherCard.jsx     # Weather display component
├── App.jsx             # Root component
├── main.jsx            # Application entry point
└── index.css           # Tailwind CSS styles
```

## API Integration

The frontend connects to your .NET Web API backend:
- `GET /api/weather/cities` - Fetch available cities
- `GET /api/weather/{cityId}` - Fetch weather data for specific city

All API calls include JWT tokens from Auth0 for authentication.

## UI Components

### CityList
- Displays grid of city buttons
- Fetches cities from backend API
- Responsive grid layout (2 cols mobile, 4 cols desktop)

### WeatherCard
- Shows weather information with icons
- Color-coded temperature backgrounds
- Displays temperature, description, humidity
- Responsive design

### Home
- Handles authentication state
- Manages weather data fetching
- Provides login/logout functionality
- Responsive header and layout

## Styling

Uses Tailwind CSS with custom component classes:
- `.weather-card` - Weather display styling
- `.city-button` - City selection buttons
- `.auth-button` - Authentication buttons

## Development

- **Framework:** React 18 + Vite
- **Authentication:** Auth0 React SDK
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Dev Server:** `http://localhost:5173`

## Production Build

```bash
npm run build
npm run preview
```