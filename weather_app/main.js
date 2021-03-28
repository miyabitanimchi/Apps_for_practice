const api = {
    key: "65a151b09aa1602aaafe305fb5a6786a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

window.addEventListener("load", getDefaultResult);

function getDefaultResult() {
    fetch(`${api.base}weather?q=vancouver&units=metric&appid=${api.key}`)
    .then(weatherHere => {
        return weatherHere.json();
    }).then(displayCurrentResults);
} 

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

let city = document.querySelector(".location .city");
let now = new Date();
let date = document.querySelector(".location .date");
let temp = document.querySelector(".current .temp");
let weather_el = document.querySelector(".current .weather");
let hilow = document.querySelector(".hi-low");

function displayResults(weather) {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    createElements(weather);
}

function displayCurrentResults(weather) {
    city.innerText = `Vancouver, CA`
    createElements(weather);
}

function createElements(weather) {
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow.innerText = `${Math.round(weather.main.temp_min)}℃ / ${Math.round(weather.main.temp_max)}℃`;
}

function dateBuilder(d) {
    console.log(d);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
   

    return `${day} ${date} ${month} ${year}`;
};