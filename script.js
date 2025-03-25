function getWeather() {
    const apiKey = '1799bd8aa6d733b0044403e381ba2e78';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); // Corrected function call
        })
        .catch(error => {
            console.log('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again later.');
        });

    fetch(forecastWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecastWeather(data.list);
        })
        .catch(error => {
            console.log('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again later.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p> ${data.message} </p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        const temperatureHTML = `<p> ${temperature}°C </p>`;
        const weatherHTML = `
        <p> ${description} </p>
        <p> ${cityName} </p>
        `;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecastWeather(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        const hourlyItemHTML = `
        <div class="hourly-item">
            <span> ${hour}:00 </span>
            <img src="${iconUrl}" alt="Hourly weather Icon">
            <span> ${temperature}°C </span>
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
