//CURRENT DATE PHRASE
function currentDate(date) {
  //WEEKDAY
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  //DATE(NUMBER)
  let dayNumber = date.getDate();
  //MONTH
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  //YEAR
  let year = date.getFullYear();
  //HOUR TIME
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${dayNumber}th of ${month}, ${year} - ${hour}:${minutes}`;
}

let now = new Date();
console.log(now);

let dateElement = document.querySelector("#date");
dateElement.innerHTML = currentDate(now);

//CITY GEOLOCALIZATION
function showCity(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-element").innerHTML =
    response.data.sys.country;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function currentPosition(position) {
  let apiKey = "8022fab3a08fe85818f82b0d2bc21781";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let location = `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${location}`).then(showCity);
}
navigator.geolocation.getCurrentPosition(currentPosition);

//CITY SEARCH AND RESULT
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "8022fab3a08fe85818f82b0d2bc21781";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

  axios
    .get(`${apiUrl}${cityInput.value}&units=metric&appid=${apiKey}`)
    .then(showCity);
}
let searchButton = document.querySelector("#usersearch");
searchButton.addEventListener("submit", citySearch);

//TEMPERATURE
let tempMessage = document.querySelector("#current-temp");

function celsiusFormula() {
  tempMessage.innerHTML = "23";
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", celsiusFormula);

function farenheitFormula() {
  let temperature = "23";
  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  tempMessage.innerHTML = `${fahrenheitTemperature}`;
}

let farenheitButton = document.querySelector("#fahrenheit");
farenheitButton.addEventListener("click", farenheitFormula);
