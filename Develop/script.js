// retrieve the key
const APIKey = "11d1e6ff7e13f1978dedaf38b5bb0ab6"

// What happens when we click search after putting exact city name?
const searchBtn = document.getElementById("#search");

// Clicking search button runs the function searchCity
searchBtn.addEventListener("click", searchCity);

// my searchCity function is based on the input value from input id exactCity
function searchCity() {
    var city = document.getElementById("#exactCity").value;

    // double check the input is grabbed
    console.log(city);

    // This doc doesn't have autocomplete or anything so upon searching exact city name it will grab ONE appropriate city result for now set in limit=1
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;

    // What we learned and been using to fetch data from the above URL
    fetch(queryURL).then((response) => response.json())
        .then((data) => {

            // double check if the data shows one and only search result with its latitude and longitude
            console.log(data[0].lat);
            console.log(data[0].lon);

            // keep going with the existing latitude + longitude to find the city's weather information without the minutely and hourly data in imperial units    
            var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&appid=" + APIKey + "&units=imperial"
            fetch(weatherURL).then((response) => response.json())
                .then((data) => {

                    // double check if the info appears
                    console.log(data)

                    // grab input and make sure it's in uppercase for aesthetic purposes
                    $("#currentCity").textContent = city.toUpperCase();

                    // grab other necessary info and replace it in respective span id and make sure it's all uppercase for aesthetic purposes
                    // how will i grab icon?
                    console.log(data.current.temp);
                    document.getElementById("#fahrenheit").textContent = data.current.temp + " °F";
                    console.log(data.current.wind);
                    document.getElementById("#mph").textContent = data.current.wind_speed + " mph";
                    console.log(data.current.humidity);
                    document.getElementById("#percent").textContent = data.current.humidity + " %";
                    console.log(data.current.uvi);
                    document.getElementById("#decimal").textContent = data.current.uvi;
                })

        });




}



