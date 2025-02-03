const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "1617bb66f376bfa9d2d272b91df04252";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
                break;
            case 'Clear':
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
                break;
            case 'Rain':
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163628.png";
                break;
            case 'Mist':
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
                break;
            case 'Snow':
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
                break;
            default:
                weather_img.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Default weather image
                break;
        }
    } catch (error) {
        alert("An error occurred while fetching weather data.");
        console.error(error);
    }
}

searchBtn.addEventListener('click', () => {
    const cityName = inputBox.value;
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name");
    }
});
