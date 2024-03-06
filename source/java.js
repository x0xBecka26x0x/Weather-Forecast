function weatherInfo(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    
   
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}m/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

    showForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday",
     "Monday", 
     "Tuesday", 
     "Wednesday", 
     "Thursday", 
     "Friday", 
     "Saturday",
    ];

    let day = days [date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "bf8f1010b3c486eaa378at4e5eo24f84";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(weatherInfo); 
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    
    searchCity(searchInput.value);
}

function showForecast(city) {
    let apiKey = "bf8f1010b3c486eaa378at4e5eo24f84";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = "";

    days.forEach(function (day) {
        forecastHTML = 
            forecastHTML +
            `  
            <div class="weather-forecast-day">
            <div class="forecast-date">${day}</div>
            <div id="weather-forecast-icon">⛅</div>
            <div class="forecast-temperatures">
                <div class="forecast-temperature"> 
                <strong>18°</strong>
                </div>
                <div class="forecast-temperature">12°</div>
                </div>
            </div>
         `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}
    
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);


searchCity("Paris");



