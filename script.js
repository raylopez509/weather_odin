async function getWeather() {
  const weather = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=FEHG5ATRCQXYY2P4AVVQ3YCGX', {mode: 'cors'})
  const weatherData = await weather.json();
  console.log(weather);
  console.log(weatherData);
  return weatherData;
}

await console.log(getWeather());
