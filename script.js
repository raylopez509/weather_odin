async function getWeatherData(location) {
  const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=FEHG5ATRCQXYY2P4AVVQ3YCGX`, {mode: 'cors'})
  const weatherData = await weather.json();
  console.log(weatherData);
  return weatherData;
}

async function processWeatherData(weatherData) {
  const apiData = await weatherData;
  const data = {
    location: apiData.resolvedAddress,
    temperature: apiData.currentConditions.temp,
    conditions: apiData.currentConditions.conditions,
    tempmax: apiData.days[0].tempmax,
    tempmin: apiData.days[0].tempmin
  }
  console.log(data);
  return data;
}

function getWeatherButton(event) {
  event.preventDefault();
  const location = document.querySelector('input').value;
  console.log(location);
  displayWeather(processWeatherData(getWeatherData(location)));
}

async function displayWeather(data) {
  const container = document.querySelector('#weather-container');
  while(container.firstChild) {
    container.removeChild(container.lastChild)
  }
  const loading = document.createElement('div');
  loading.textContent = "Loading...";
  container.append(loading);
  const d = await data;
  container.removeChild(loading);
  const location = document.createElement('div');
  const temperature = document.createElement('div');
  const conditions = document.createElement('div');
  const tempMax = document.createElement('div');
  const tempMin = document.createElement('div');
  location.textContent = d.location;
  temperature.textContent = `${d.temperature}° F`;
  conditions.textContent = d.conditions;
  tempMax.textContent = `H: ${d.tempmax}°`;
  tempMin.textContent = `L: ${d.tempmin}°`;
  console.log(location.textContent);
  container.appendChild(location);
  container.appendChild(temperature);
  container.appendChild(conditions);
  container.appendChild(tempMax);
  container.appendChild(tempMin);
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => getWeatherButton(event));