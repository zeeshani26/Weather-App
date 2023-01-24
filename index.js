//fbe49ea1d0ea8bd5d29a93254c1d82cc

//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

//https://maps.google.com/maps?q=pune&t=&z=13&ie=UTF8&iwloc=&output=embed

let container = document.getElementById(`display_info`);
let container2 = document.getElementById(`part_2`);
let map = document.getElementById(`gmap_canvas`);
let lang;
let long;

let api_key = "fbe49ea1d0ea8bd5d29a93254c1d82cc";
let widget_id;
async function getWeather(widget_id) {
  let city = document.getElementById(`city`).value;
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    );
    weather_data = await res.json();
    widget_id = weather_data.id;
    console.log(weather_data);
    //    console.log(widget_id)
    widget_function(widget_id);
    Display(weather_data);
  } catch (err) {
    console.log(err);
  }
}

function Display(weather_data) {
  container.innerHTML = null;
  container2.innerHTML = null;
  let name = document.createElement(`p`);
  name.innerText = `${weather_data.name}`;

  let temp = document.createElement(`p`);
  temp.innerText = `Temp: ${weather_data.main.temp}`;

  let humidity = document.createElement(`p`);
  humidity.innerText = `Humidity: ${weather_data.main.humidity}`;

  let pressure = document.createElement(`p`);
  pressure.innerText = `Pressure: ${weather_data.main.pressure}`;

  let feels = document.createElement(`p`);
  feels.innerText = `Feels Like: ${weather_data.main.feels_like}`;

  let max = document.createElement(`p`);
  max.innerText = `Maximum Temp.: ${weather_data.main.temp_max}`;

  let min = document.createElement(`p`);
  min.innerText = `Minimum Temp.: ${weather_data.main.temp_min}`;

  let weather = document.createElement(`p`);
  weather.innerText = `Weather: ${weather_data.weather[0].main}`;

  map.src = `https://maps.google.com/maps?q=${weather_data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  let image = document.createElement(`img`);
  if (weather_data.weather[0].main === "Clouds") {
    image.setAttribute(
      "src",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35d4d034938099.56e31c3d864df.gif"
    );
  } else {
    image.setAttribute(
      "src",
      "https://cdn.dribbble.com/users/2120934/screenshots/6193524/media/0e653e48615e57898805fd78918e697d.gif"
    );
  }

  container.append(name, temp, humidity, pressure, feels);
  container2.append(image, feels, max, min, weather);
}

window.onload = getlocation();

function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Location is not available on this browser");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  latlongweather(lat, long);
}

async function latlongweather(lat, lon) {
  try {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88dd3eb53994cc7bcb7b245e0018da8a&units=metric`
    );
    weather_data = await data.json();
    Display(weather_data);
  } catch (err) {
    console.log(err);
  }
}

function widget_function(widget_id) {
  window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
  window.myWidgetParam.push({
    id: 1,
    cityid: `${widget_id}`,
    appid: "fbe49ea1d0ea8bd5d29a93254c1d82cc",
    units: "metric",
    containerid: "openweathermap-widget-1",
  });
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);
  })();
}
