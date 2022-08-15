// retrieve the key
const APIKey = "11d1e6ff7e13f1978dedaf38b5bb0ab6"

// What happens when we click search after putting exact city name?

// Clicking search button runs the below function
document.getElementById("search").addEventListener("click", () => {

    // this is the input being searched
    var city = document.getElementById("exactCity").value;
    saveSearch(city);
    // double check the input is grabbed
    console.log(city);

    // This doc doesn't have autocomplete or anything so upon searching exact city name it will grab ONE appropriate city result for now set in limit=1
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    // What we learned and been using to fetch data from the above URL
    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // double check if the data shows one and only search result with its latitude and longitude
            console.log(data[0].lat);
            console.log(data[0].lon);

            // keep going with the existing latitude + longitude to find the city's weather information without the minutely and hourly data in imperial units    
            var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial";
            fetch(weatherURL)
                .then((response) => response.json())
                .then((data) => {

                    // double check if the info appears
                    console.log(data);

                    // grab input and make sure it's in uppercase for aesthetic purposes
                    document.getElementById("currentCity").innerText = city.toUpperCase();

                    // Tutor taught me to use string interpolation for the icon here
                    var iconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
                    document.getElementById("icon").src = iconUrl;

                    // moment().format() was returning the wrong date; asked around class and got this hint and linked to moment.js in html
                    document.getElementById("today").innerText = moment.unix(data.current.dt).format("MM/DD/YYYY");

                    // grab other necessary info and replace it in respective span id and make sure it's all uppercase for aesthetic purposes
                    document.getElementById("fahrenheit").innerText = data.current.temp + " °F";
                    document.getElementById("mph").innerText = data.current.wind_speed + " MPH";
                    document.getElementById("percent").innerText = data.current.humidity + " %";
                    document.getElementById("decimal").innerText = data.current.uvi;

                    // create a loop in which these items will be grabbed until the 5th day
                    for (i = 0; i < 5; i++) {
                        var date = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
                        var iconUrl = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
                        const x = createWeatherHTML(date, iconUrl, data.daily[i].temp.day, data.daily[i].wind_speed, data.daily[i].humidity)
                        document.getElementById("day" + i).appendChild(x)
                    }

                });
        });
})

// creating a function that will be used inside the function above with the help of tutor 
function createWeatherHTML(date, icon, temp, wind, humidity) {

    const ul = document.createElement("ul");
    ul.classList.add("forecast");
    const liDate = document.createElement("li");
    const liIcon = document.createElement("img");
    const liTemp = document.createElement("li");
    const liWind = document.createElement("li");
    const liHumidity = document.createElement("li");

    liDate.innerText = date;
    liIcon.setAttribute("src", icon);
    liTemp.innerText = "Temperature: " + temp + " °F";
    liWind.innerText = "Wind: " + wind + " MPH";
    liHumidity.innerText = "Humidity: " + humidity +" %";

    ul.appendChild(liDate);
    ul.appendChild(liIcon);
    ul.appendChild(liTemp);
    ul.appendChild(liWind);
    ul.appendChild(liHumidity);

    return ul;
}

// save searched cities in the search history here
function saveSearch(city) {
    var history = JSON.parse(localStorage.getItem("history"));
    if(history==null){
        history=[];
    }
    history.push(city);
    localStorage.setItem("history", JSON.stringify(history));
    
}

                // don't forget to indicate the uvi condition adding background color
                    // if(data.current.uvi <= 3){
                    //     document.getElementById("decimal").addClass("favorable");
                    // } else if (data.current.uvi >3 && data.current.uvi <= 5){
                    //     document.getElementById("decimal").addClass("moderate");
                    // } else {
                    //     document.getElementById("decimal").addClass("severe");
                    // };