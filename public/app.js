const form = document.getElementById("weatherForm");
const saveButton = document.getElementById("saveButton");

let currentWeather = {};
let weatherChart;

const map = L.map("map").setView([38.98, -76.94], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const date = document.getElementById("date").value;

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max`;

    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.daily.temperature_2m_max[0];

    document.getElementById("weatherResult").innerHTML =
        "Temperature: " + temperature + "°C";

    currentWeather = {
        location: latitude + ", " + longitude,
        date: date,
        temperature: temperature,
        weather: "Historical Weather"
    };

    L.marker([latitude, longitude]).addTo(map);

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(document.getElementById("weatherChart"), {
        type: "bar",
        data: {
            labels: ["Temperature"],
            datasets: [{
                label: "Temperature",
                data: [temperature]
            }]
        }
    });
});

saveButton.addEventListener("click", async function() {
    if (!currentWeather.date) {
        alert("Search for weather first.");
        return;
    }

    await fetch("/saveDay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentWeather)
    });

    alert("Weather Day Saved!");
});