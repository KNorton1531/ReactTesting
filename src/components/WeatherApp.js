import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../css/weather.css';
import axios from 'axios';  // Add this for making API requests
import { format, parseISO } from 'date-fns';
import { TiWeatherCloudy } from "react-icons/ti";
import WeatherIcon from "./weatherIcons";



function WeatherApp({ id }) {

    const playerWidth = 640; // Set the width of the YouTube player
    const playerHeight = 390; // Set the height of the YouTube player

    const apiKey = '70f8e11869e0910ef071d9b3cffd70cb'; // Be sure to replace with your actual API key
    const [weatherData, setWeatherData] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);;

    // Function to calculate the centered position
    const getCenteredPosition = () => {
        const x = (window.innerWidth - playerWidth) / 2;
        const y = (window.innerHeight - playerHeight) / 2;
        return { x, y };
    };

    useEffect(() => {
        const lat = '53.78395';
        const lon = '-2.89291';
        const fetchWeatherData = async () => {
            const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=5`;
            const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const [forecastResponse, currentResponse] = await Promise.all([
                    axios.get(urlForecast),
                    axios.get(urlCurrent)
                ]);
                setWeatherData(forecastResponse.data);
                setCurrentWeather(currentResponse.data);

                console.log(currentResponse.data);
                console.log(forecastResponse.data);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };

        fetchWeatherData();
    }, [id]);  // Dependency array with id ensures that data is refetched if the id changes


    const storageKey = `position_${id}`;
    const savedPosition = JSON.parse(localStorage.getItem(storageKey));
    const initialPosition = savedPosition || getCenteredPosition();


    const [isVisible, setIsVisible] = useState(true);

    const [position, setPosition] = useState(initialPosition);
    const visibilityKey = `visibility_${id}`;

    useEffect(() => {
        // Update to use initialPosition if not defined in local storage to handle resize before any drag
        const savedVisibility = JSON.parse(localStorage.getItem(visibilityKey)) !== null ? JSON.parse(localStorage.getItem(visibilityKey)) : true;
        setIsVisible(savedVisibility);
    }, [visibilityKey]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Assuming the parent is the window; adjust as needed for a different parent
            const parentWidth = window.innerWidth;
            const parentHeight = window.innerHeight;
            const newPosition = { ...position };

            // Adjust position if out of bounds. Adjust these based on the draggable component's size
            if (newPosition.x < 0) newPosition.x = 0;
            if (newPosition.y < 0) newPosition.y = 0;
            if (newPosition.x > parentWidth - 310) newPosition.x = parentWidth - 310; // Assuming width of the YouTube player
            if (newPosition.y > parentHeight - 257) newPosition.y = parentHeight - 257; // Assuming height of the YouTube player

            if (newPosition.x !== position.x || newPosition.y !== position.y) {
                setPosition(newPosition);
                localStorage.setItem(storageKey, JSON.stringify(newPosition));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [position, storageKey]);

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(storageKey, JSON.stringify(newPosition));
    };

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    }
    
    

    return (
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.weatherHandle'}>
            <div className='weatherWrapper' id='WeatherApp'>
            <div class="weatherHandle"></div>

            {currentWeather ? (
               
            <div className='currentContainer'>
                <div className='currentInformation'>
                    <h4 className='currentLocation'>{currentWeather.name}</h4>
                    <h4 className='weatherDescription'>{capitalizeFirstLetter(currentWeather.weather[0].description)}</h4>
                    <h4 className='currentTemp'>{Math.round(currentWeather.main.temp)}°C</h4>
                    <h4 className='highLowTemp'>{Math.round(currentWeather.main.temp_max)}° / {Math.round(currentWeather.main.temp_min)}°C</h4>
                </div>
                <div className='currentIcon'><TiWeatherCloudy /></div>
            </div>

            ) : 'Loading Current Weather...'}
            {weatherData ? (

            <div className='futureContainer'>
                <div className='weatherItem'>
                    <div className='forecastIcon'>
                        <WeatherIcon code={weatherData.list[0].weather[0].icon} />
                    </div>
                    <div class="futureTemp">{Math.round(weatherData.list[1].main.temp)}°C</div>
                    <h4>{formatTime(weatherData.list[0].dt_txt)}</h4>
                </div>

                <div className='weatherItem'>
                    <div className='forecastIcon'>
                        <WeatherIcon code={weatherData.list[1].weather[0].icon} />
                    </div>
                    <div class="futureTemp">{Math.round(weatherData.list[2].main.temp)}°C</div>
                    <h4>{formatTime(weatherData.list[1].dt_txt)}</h4>
                </div>

                <div className='weatherItem'>
                    <div className='forecastIcon'>
                        <WeatherIcon code={weatherData.list[2].weather[0].icon} />
                    </div>
                    <div class="futureTemp">{Math.round(weatherData.list[2].main.temp)}°C</div>
                    <h4>{formatTime(weatherData.list[2].dt_txt)}</h4>
                </div>

                <div className='weatherItem'>
                    <div className='forecastIcon'>
                        <WeatherIcon code={weatherData.list[3].weather[0].icon} />
                    </div>
                    <div class="futureTemp">{Math.round(weatherData.list[3].main.temp)}°C</div>
                    <h4>{formatTime(weatherData.list[3].dt_txt)}</h4>
                </div>
            </div>
           
            ) : 'Loading Forecast...'}
            </div>
        </Draggable>
    );
}

export default WeatherApp;
