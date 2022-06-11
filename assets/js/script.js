var buttonEl = document.querySelector(".btn")
var inputValue = document.querySelector(".input")
var cityName = document.querySelector('.cityName');
var weatherHumid = document.querySelector('.humidity');
var tempValue = document.querySelector(".temp")
var windValue = document.querySelector(".wind")
var uvValue = document.querySelector(".uv")
var cityStored = document.querySelector("#savedCity")
var fiveDayForecast = document.querySelector("#fiveday-forcast");
var fiveDayTitle = document.querySelector(".five")
var fiveContainer = document.querySelector("#fiveday-container")

buttonEl.addEventListener("click", function () {
    localStorage.setItem("city", inputValue.value);

    var city = document.createElement("button");
    city.classList.add("btn")
    city.innerText = localStorage.getItem('city');
    cityStored.appendChild(city)
    weatherGet();

})
var weatherGet = function () {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&appid=154a57fedfa17fef2e0e01f2b48a62b1&units=imperial")
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => {
            var weatherIcon = data.weather[0].icon
            iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            var cityValue = data["name"];
            var temp = data['main']['temp'];
            var humid = data['main']['humidity'];
            var wind = data['wind']['speed'];
            cityName.innerHTML = cityValue + "(" + moment().format("MM/DD/YYYY") + ")" + '<img src="' + iconUrl + '">';
            tempValue.innerHTML = "Temperature: " + temp + "°F";
            weatherHumid.innerHTML = " Humidity: " + humid + "%";
            windValue.innerHTML = "Wind Speed: " + wind + "MPH";
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            uvIndex(lat, lon);
        })
}
var uvIndex = function (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=154a57fedfa17fef2e0e01f2b48a62b1&units=imperial")
        .then(response => response.json())
        .then(function (data) {
            displayUv(data);
            fiveDay(data);
        })

}

var displayUv = function (index) {
    console.log(index)
    uvValue.innerHTML = "UV Index: "
    var uvDex = index.current.uvi
    var uv = document.createElement("span")
    uv.textContent = uvDex;

    if (uvDex < 5) {
        uv.classList = "nice";
    }
    else if (uvDex > 5 && uvDex <= 8) {
        uv.classList = "moderate";
    }
    else if (uvDex > 8) {
        uv.classList = "severe";
    }
    uvValue.appendChild(uv);
}
var fiveDay = function (weather) {
    console.log(weather)


    fiveDayTitle.innerHTML = "Five Day Forecast"
    var forecast = weather.daily;
    for (var i = 1; i < forecast.length; i++ , forecast.length = 6) {
        var daily = forecast[i];

        var forecastEl = document.createElement('div');
        forecastEl.classList = "card bg-primary text-light m-2";
        console.log(daily);
        // create date 
        var forDate = document.createElement("h5")
        forDate.textContent = moment.unix(daily.dt).format("MMM D,YYYY");
        forDate.classList = "card-header text-center"
        // append to card
        forecastEl.appendChild(forDate);

        // set weather image of 5 day forecast 

        var weatherImg = document.createElement("img")
        weatherImg.classList = "card-body text-center";
        weatherImg.setAttribute("src", "https://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png");
        // append to card
        forecastEl.appendChild(weatherImg);
        // temp for 5 day
        var forTemp = document.createElement("p")
        forTemp.classList = "card-body text-center";
        forTemp.textContent = daily.temp.day + " °F";
        forecastEl.appendChild(forTemp)
        
    
// append to fiveday container 
        fiveContainer.appendChild(forecastEl)
       
    }
}
// buttonEl.addEventListener('click', function () {

//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=154a57fedfa17fef2e0e01f2b48a62b1")
//         .then(response => response.json())
//         .then(data => console.log(data))
// })
// fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue.value + "&appid=154a57fedfa17fef2e0e01f2b48a62b1")
// .then(response => response.json())
// .then(data => {
//     var lat = data.coord.lat
//     var lon = data.coord.lon
