// https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=e6e1ac4e031c99f667eb54491e858a8f&units=metric
// <i class="fa-solid fa-cloud"></i>
let searchBtn = document.querySelector(".main-btn");
let theIput = document.querySelector(".my-input");
let tempSpanElement = document.querySelector(".weather-info .temp-span");
let cityNameElement = document.querySelector(".weather-info .city-name");
let windSpeedELement = document.querySelector(
  ".wind-info .wind-speed .wind-span"
);
let humidityElement = document.querySelector(".humdity-info .humidity-span");
let weatherStatusElement = document.querySelector(
  ".weather-status .satus-span"
);

function isEmpty() {
  if (theIput.value === "") {
    return true; //empty
  } else {
    return false;
  }
}

searchBtn.onclick = function () {
  if (isEmpty()) {
    alert("Please Enter City Name");
  } else {
    //do request
    createAPiRequest(theIput.value);
    theIput.value = "";
  }
};
// document.qu("myInput").addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         alert("تم الضغط على Enter!");
//     }
// });
document
  .querySelector(".my-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (isEmpty()) {
        alert("Please Enter City Name");
      } else {
        //do request
        createAPiRequest(theIput.value);
        theIput.value = "";
      }
    }
  });
async function createAPiRequest(cityName) {
  let apikey = `e6e1ac4e031c99f667eb54491e858a8f`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;

  try {
    let response = await axios(url);
    let responseObject = response.data;

    let temp_deg = responseObject.main.temp;
    // let the_country = responseObject.sys.country;
    let the_city = responseObject.name;
    let wind_speed = responseObject.wind.speed;
    // let wind_degree = responseObject.wind.deg;
    let humidity = responseObject.main.humidity;
    let weather_status = responseObject.weather[0].description;
    tempSpanElement.innerHTML = temp_deg;
    cityNameElement.innerHTML = the_city;
    windSpeedELement.innerHTML = Math.ceil(Number(wind_speed) * 3.6); //to convert meter/second to km/hour
    humidityElement.innerHTML = humidity;
    weatherStatusElement.innerHTML = weather_status;
  } catch (error) {
    alert(error.response.data.message);
  }
}
// initially
createAPiRequest("cairo");
