// retrieve the key
const APIKey = "11d1e6ff7e13f1978dedaf38b5bb0ab6"

// What happens when we click search after putting exact city name?

// Clicking search button runs the below function
$("#search").on("click", () => {

        // this is the input being searched
        var city = $("#exactCity").value;

        // double check the input is grabbed
        console.log(city); //Why is it undefined?

        // This doc doesn't have autocomplete or anything so upon searching exact city name it will grab ONE appropriate city result for now set in limit=1
        var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
        // why is this not working?
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
                        $("#currentCity").textContent = city.toUpperCase();

                        // grab other necessary info and replace it in respective span id and make sure it's all uppercase for aesthetic purposes
                        // how can grab icon?
                        console.log(data.current.temp);
                        $("#fahrenheit").textContent = data.current.temp + " °F";
                        console.log(data.current.wind);
                        $("#mph").textContent = data.current.wind_speed + " mph";
                        console.log(data.current.humidity);
                        $("#percent").textContent = data.current.humidity + " %";
                        console.log(data.current.uvi);
                        $("#decimal").textContent = data.current.uvi;
                    });
            });
    })