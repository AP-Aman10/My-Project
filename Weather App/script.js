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
	const api_key = "5b0fa9dc0bfc4e6dea6429922070453c";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

	try {
		const weather_data = await fetch(url);
		const data = await weather_data.json();

		if (data.cod === "404") {
			location_not_found.style.display = "flex";
			weather_body.style.display = "none";
			console.log("City not found");
			return;
		}

		location_not_found.style.display = "none";
		weather_body.style.display = "flex";

		temperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
		description.innerHTML = data.weather[0].description;
		humidity.innerHTML = `${data.main.humidity}%`;
		wind_speed.innerHTML = `${Math.round(data.wind.speed * 3.6)} Km/H`;


		// Set image based on weather
		switch (data.weather[0].main) {
			case 'Clouds':
				weather_img.src = "assets/cloud.png";
				break;
			case 'Clear':
				weather_img.src = "assets/clear.png";
				break;
			case 'Rain':
				weather_img.src = "assets/rain.png";
				break;
			case 'Mist':
				weather_img.src = "assets/mist.png";
				break;
			case 'Snow':
				weather_img.src = "assets/snow.png";
				break;
			default:
				weather_img.src = "assets/cloud.png";
		}

	} catch (error) {
		console.error("Error fetching weather data:", error);
		location_not_found.style.display = "flex";
		weather_body.style.display = "none";
	}
}

// Search button click event
searchBtn.addEventListener('click', () => {
	const city = inputBox.value.trim();
	if (city) checkWeather(city);
});

// Enter key support
inputBox.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		const city = inputBox.value.trim();
		if (city) checkWeather(city);
	}
});