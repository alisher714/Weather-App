const container = document.querySelector(".main-container");
const search = document.querySelector(".search-bar button");
const weatherbox = document.querySelector(".weather-box");
const weatherdetail = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");
const cityhide = document.querySelector(".city-hide");

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
        cityhide.textContent = city;
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


      if(cityhide.textContent == city){
        return;
      }
      else{
        cityhide.textContent = city;
        container.style.height = "550px";
        container.classList.add("active");
        weatherbox.classList.add("active");
        weatherdetail.classList.add("active");
        error404.classList.remove("active"); 


        setTimeout(() => {
            container.classList.remove("active");  
        }, 2500);

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



          const infoweather = document.querySelector('.info-weather');
          const infohumidity = document.querySelector('.info-humidity');
          const infowind = document.querySelector('.info-wind');


          const elCloneinfoweather = infoweather.cloneNode(true);
          const elCloneinfohumidity = infohumidity.cloneNode(true);
          const elCloneinfowind = infowind.cloneNode(true);



          elCloneinfoweather.id = 'clone-info-weather';
          elCloneinfoweather.classList.add('active-clone');

          
          elCloneinfohumidity.id = 'clone-info-humidity';
          elCloneinfohumidity.classList.add('active-clone');
          
          elCloneinfowind.id = 'clone-info-wind';
          elCloneinfowind.classList.add('active-clone');


          setTimeout(() => {
            infoweather.insertAdjacentElement("afterend",elCloneinfoweather);
            infohumidity.insertAdjacentElement("afterend",elCloneinfohumidity);
            infowind.insertAdjacentElement("afterend",elCloneinfowind);
          }, 2200);

          const cloneInfoweather = document.querySelectorAll('.info-weather.active-clone');
          const totalCloneInfoWeather = cloneInfoweather.length;
          const cloneInfoWeatherFirst = cloneInfoweather[0];


          const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone')
          const cloneInfoHumidityFirst = cloneInfoHumidity[0];

          const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone')
          const cloneInfoWindFirst = cloneInfoWind[0]; 


          if(totalCloneInfoWeather > 0){
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(() => {
              cloneInfoWeatherFirst.classList.remove();
              cloneInfoHumidityFirst.classList.remove();
              cloneInfoWindFirst.classList.remove();
            }, 2200);

          }
      }
    });
});
