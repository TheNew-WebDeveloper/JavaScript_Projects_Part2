let cityInput = document.querySelector("#cityInput");
let errMsg = document.querySelector("#errorMsg");

document.querySelector("#searchBtn").addEventListener("click", function () {
  let city = cityInput.value.trim();
  console.log(city.length);

  if (city.length <= 2) {
    errMsg.textContent = "Invalid City";
    errMsg.style.display = "block";
    return;
  } else {
    errMsg.style.display = "none";
    findCity(city);
  }
});

async function findCity(inp) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=bd5e378503939ddaee76f12ad7a97608`,
    );

    if (!response.ok) {
      errMsg.textContent =
        response.status === 404 ? "City not found" : "Server error";
      errMsg.style.display = "block";
      document.querySelector("#weatherInfo").style.display = "none";
      return;
    } else {
      let cityData = await response.json();

      document.querySelector("#weatherInfo").style.display = "block";

      updateUI(cityData);
    }
  } catch (error) {
    errMsg.textContent = "Something went wrong: " + error.message;
    errMsg.style.display = "block";
    document.querySelector("#weatherInfo").style.display = "none";
  }
}

function updateUI(data) {
  document.querySelector("#cityName").textContent = data.name;
  document.querySelector("#temperature").textContent =
    (data.main.temp - 273.15).toFixed(1) + " °C";
  document.querySelector("#condition").textContent =
    data.weather[0].description;
  document.querySelector("#humidity").textContent = data.main.humidity + "%";
  document.querySelector("#wind").textContent =
    (data.wind.speed * 3.6).toFixed(1) + " km/h";
}
