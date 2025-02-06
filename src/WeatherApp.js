import React, { useState } from 'react';
import { Cloud, Loader2 } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '1rem'
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#111827'
  },
  cardContent: {
    padding: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  input: {
    flex: 1,
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
    outline: 'none',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
    }
  },
  button: {
    minWidth: '120px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'white',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#2563eb'
    },
    '&:disabled': {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed'
    }
  },
  alert: {
    padding: '1rem',
    borderRadius: '4px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    marginBottom: '1rem'
  },
  weatherData: {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '4px'
  },
  weatherItem: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#374151'
  },
  label: {
    fontWeight: 600,
    marginRight: '0.5rem'
  },
  spinner: {
    animation: 'spin 1s linear infinite'
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
};

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '2d5af546ab2333d6db08044787828a2e';
  const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          weather: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity
        });
        setError('');
      } else {
        setError('City not found or API request error.');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h1 style={styles.title}>
            <Cloud size={24} />
            Weather App
          </h1>
        </div>
        <div style={styles.cardContent}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              style={styles.button}
              onClick={getWeather}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} style={styles.spinner} />
              ) : (
                'Get Weather'
              )}
            </button>
          </div>

          {error && (
            <div style={styles.alert}>
              {error}
            </div>
          )}

          {weatherData && (
            <div style={styles.weatherData}>
              <p style={styles.weatherItem}>
                <span style={styles.label}>Weather:</span>
                <span style={{textTransform: 'capitalize'}}>{weatherData.weather}</span>
              </p>
              <p style={styles.weatherItem}>
                <span style={styles.label}>Temperature:</span>
                {weatherData.temperature}°C
              </p>
              <p style={styles.weatherItem}>
                <span style={styles.label}>Humidity:</span>
                {weatherData.humidity}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
