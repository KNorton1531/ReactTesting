import React from 'react';
// Import the React Icons library
import { WiDaySunny, WiNightClear, WiCloud, WiRain, WiThunderstorm, WiSnow, WiFog, WiRainMix } from 'react-icons/wi';
import { LiaCloudSunSolid } from "react-icons/lia";
import { IoIosSnow } from "react-icons/io";
import { BsCloudRainHeavy } from "react-icons/bs";


// A mapping from icon code to React Icon component
const weatherIconMap = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': LiaCloudSunSolid, // Choose appropriate icons for few clouds
  '02n': WiCloud, // and so on for other mappings
  '03d': WiCloud, // Use appropriate icons for scattered clouds
  '03n': WiCloud,
  '04d': WiCloud, // Use appropriate icons for broken clouds
  '04n': WiCloud,
  '09d': WiRainMix, // Choose appropriate icons for shower rain
  '09n': WiRainMix,
  '10d': WiRain , // Use appropriate icons for rain
  '10n': WiRain ,
  '11d': WiThunderstorm,
  '11n': WiThunderstorm,
  '13d': IoIosSnow ,
  '13n': IoIosSnow ,
  '50d': WiFog,
  '50n': WiFog,
};

const WeatherIcon = ({ code }) => {
  // Assuming 'code' is something like '10d'
  const IconComponent = weatherIconMap[code] || WiDaySunny; // Default to WiDaySunny if code is not found
  
  return <IconComponent />;
};

export default WeatherIcon;