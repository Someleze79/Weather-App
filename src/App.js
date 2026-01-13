import React, { useState } from 'react';

// Replace with your own API key from weatherapi.com
const API_KEY = "024c33313dab4f4593d230229252104";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Function to fetch weather data from API
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Weather App</h1>

      {/* Input field for city */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />

      {/* Button to get weather */}
      <button onClick={fetchWeather} style={styles.button}>
        Get Weather
      </button>

      {/* Display error if any */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display weather data if available */}
      {weather && (
        <div style={styles.result}>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}

// Inline styling
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    textAlign: 'center'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginRight: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  result: {
    marginTop: '1rem',
    fontSize: '1.1rem'
  },
  error: {
    color: 'red',
    marginTop: '1rem'
  }
};

export default App;