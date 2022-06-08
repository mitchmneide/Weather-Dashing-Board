var buttonEl = document.querySelector(".btn")
var inputValue = document.querySelector(".input")
var cityName = document.querySelector('.cityName');
 var weatherHumid= document.querySelector('.humidity');
 var tempValue= document.querySelector(".temp")
 var windValue = document.querySelector(".wind")

 buttonEl.addEventListener("click", function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&appid=154a57fedfa17fef2e0e01f2b48a62b1&units=imperial")
    .then (response => response.json())
    // .then(data => console.log(data))
    .then(data => {
        var cityValue = data["name"]
        var temp = data['main']['temp']
        var humid = data['main']['humidity']
        var wind = data['wind']['speed']
        cityName.innerHTML=cityValue + (" + now.format(MM/DD/YYYY");
        tempValue.innerHTML = "Temperature: " + temp + "°F";
        weatherHumid.innerHTML = " Humidity: " + humid + "%"
        windValue.innerHTML = "Wind Speed: " + wind + "MPH";
    })
    
 })


// var apiKey ="154a57fedfa17fef2e0e01f2b48a62b1"
// var weatherData = {}
// var xhr = new XMLHttpRequest()
// xhr.open('GET',"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey);
// xhr.responseType = "text"
// xhr.addEventListener("load", function(){
// deswq   
// },false)