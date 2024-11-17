const container = document.querySelector(".main-container");
const search = document.querySelector(".search-bar button");
const weatherbox = document.querySelector(".weather-box");
const weatherdetail = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIkey = "c57d3371e7d26eb74f33621ace0a77e1";
  //   `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=c57d3371e7d26eb74f33621ace0a77e1`

  const city = document.querySelector(".search-bar input").value;

  console.log(city);

  if (city == "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
  ).then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherbox.classList.remove("active");
        weatherdetail.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-detail .humidity span");
      const wind = document.querySelector(".weather-detail .Wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;
          
        default:
          image.src = "images/cloud.png";
          break;
        }

        var temp = parseInt(json.main.temp);
        temperature.innerHTML = temp - 273 + `<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;


      container.style.height = "550px";
      weatherbox.classList.add("active");
      weatherdetail.classList.add("active");
      error404.classList.remove("active");
    });
});
