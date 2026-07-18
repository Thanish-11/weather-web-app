const apiKey = "88b68cf7a5824aaf8f265151261807";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

const loading = document.getElementById("loading");
const weather = document.getElementById("weather");
const error = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    loading.style.display = "block";
    weather.style.display = "none";
    error.style.display = "none";

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("temp").innerHTML =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").innerHTML =
            data.current.condition.text;

        document.getElementById("cityName").innerHTML =
            `${data.location.name}, ${data.location.region}`;

        document.getElementById("humidity").innerHTML =
            `${data.current.humidity}%`;

        document.getElementById("wind").innerHTML =
            `${data.current.wind_kph} km/h`;

        document.getElementById("country").innerHTML =
            data.location.country;

        document.getElementById("time").innerHTML =
            data.location.localtime;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        loading.style.display = "none";
        weather.style.display = "block";

    }

    catch (err) {

        loading.style.display = "none";
        error.style.display = "block";

    }

}