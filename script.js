"using strict";

const apiKey = "bdf242b5f8a7479e803c6946acddf02f";
const openWeatherApiKey = "2a0334cc025c20d71ecdbe65179ae11f";

// CREATING DAILY WEATHER VARIABLES---//
const cityNameEl = document.querySelector(".city__name");
const mainTemperatureEl = document.querySelector(".main__temperature");
const mainWeatherDescriptionEl = document.querySelector(
  ".main__weather__description"
);
const mainMaxTemperatureEl = document.querySelector(".main__max__temperature");
const mainMinTemperatureEl = document.querySelector(".main__min__temperature");
const dailyWeatherContainer = document.getElementById("daily-weather");
const hourlyWeatherContainer = document.getElementById("hourly-weather");
const hourlyWeatherInformation = document.querySelector(
  ".hourly-weather-informations"
);
const dailyWeatherInformation = document.querySelector(
  ".daily-weather-informations"
);

let dailyWeatherBody,
  dailyWeatherDate,
  dailyWeatherImage,
  dailyWeatherMinTemp,
  dailyWeatherMaxTemp,
  hourlyWeatherBody,
  hourlyWeatherDate,
  hourlyWeatherImage,
  hourlyTemperature;

// CREATING DAILY WEATHER ELEMENTS DYNAMICALLY---//
const createDailyWeatherElements = () => {
  dailyWeatherBody = document.createElement("div");
  dailyWeatherDate = document.createElement("p");
  dailyWeatherImage = document.createElement("img");
  dailyWeatherMinTemp = document.createElement("p");
  dailyWeatherMaxTemp = document.createElement("p");
  dailyWeatherBody.className = "daily-weather-body";
  dailyWeatherBody.append(
    dailyWeatherDate,
    dailyWeatherImage,
    dailyWeatherMaxTemp,
    dailyWeatherMinTemp
  );
  // dailyWeatherContainer.append(dailyWeatherBody);
  dailyWeatherInformation.append(dailyWeatherBody);
};

// FETCHING DAILY WEATHER DATA---//
const getDailyWeather = (cityName) => {
  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName},NC&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i <= 9; i++) {
        createDailyWeatherElements();
        cityNameEl.textContent = data.city_name;
        mainMaxTemperatureEl.textContent = `H:${Math.round(
          data.data[0].max_temp
        )}°`;
        mainMinTemperatureEl.textContent = `L:${Math.round(
          data.data[0].min_temp
        )}°`;
        dailyWeatherImage.src = `./assets/icons/${data.data[i].weather.icon}.png`;
        dailyWeatherDate.textContent = data.data[i].datetime;
        dailyWeatherMaxTemp.textContent = `${Math.round(
          data.data[i].max_temp
        )}°/`;
        dailyWeatherMinTemp.textContent = `${Math.round(
          data.data[i].min_temp
        )}°`;
      }
      console.log(data);
    });
};

getDailyWeather("Frankfurt");

// CREATING HOURLY WEATHER ELEMENTS DYNAMICALLY---//

const createHourlyWeatherElements = () => {
  hourlyWeatherBody = document.createElement("div");
  hourlyWeatherDate = document.createElement("p");
  hourlyWeatherImage = document.createElement("img");
  hourlyTemperature = document.createElement("p");
  hourlyWeatherBody.className = "hourly-weather-body";
  hourlyWeatherBody.append(
    hourlyWeatherDate,
    hourlyWeatherImage,
    hourlyTemperature
  );
  // hourlyWeatherContainer.append(hourlyWeatherBody);
  hourlyWeatherInformation.append(hourlyWeatherBody);
};

// FETCHING HOURLY WEATHER DATA---//
const getHourlyWeather = (cityName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${openWeatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i <= 23; i++) {
        createHourlyWeatherElements();
        hourlyWeatherDate.textContent = data.list[i].dt_txt.slice(10, 13);
        hourlyWeatherImage.src = `./assets/icons/${data.list[i].weather[0].icon}.png`;
        hourlyTemperature.textContent = `${Math.round(
          data.list[i].main.temp
        )}°`;
      }
    });
};

getHourlyWeather("Frankfurt");
