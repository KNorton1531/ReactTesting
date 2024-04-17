import React from 'react';
// Import the React Icons library
import { WiDaySunny, WiNightClear, WiCloud, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

// A mapping from icon code to React Icon component
const weatherIconMap = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiCloud, // Choose appropriate icons for few clouds
  '02n': WiCloud, // and so on for other mappings
  '03d': WiCloud, // Use appropriate icons for scattered clouds
  '03n': WiCloud,
  '04d': WiCloud, // Use appropriate icons for broken clouds
  '04n': WiCloud,
  '09d': WiRain, // Choose appropriate icons for shower rain
  '09n': WiRain,
  '10d': WiRain, // Use appropriate icons for rain
  '10n': WiRain,
  '11d': WiThunderstorm,
  '11n': WiThunderstorm,
  '13d': WiSnow,
  '13n': WiSnow,
  '50d': WiFog,
  '50n': WiFog,
};

const WeatherIcon = ({ code }) => {
  // Assuming 'code' is something like '10d'
  const IconComponent = weatherIconMap[code] || WiDaySunny; // Default to WiDaySunny if code is not found
  
  return <IconComponent />;
};

export default WeatherIcon;