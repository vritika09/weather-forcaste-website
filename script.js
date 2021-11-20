let weather = {
  "apiKey":"ad4c63ac4b41ff78de0e4264cee1c7b1",
  fetchWeather: function(city){
    fetch( 
      "http://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      +"&units=matric&appid=" 
      + this.apiKey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // console.log(name,icon,description,temp,humidity,speed)
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = 
    "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = (temp-273).toFixed(2) + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed +"Km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
  },
  search: function(){
    this.fetchWeather(document.querySelector(".search-box").value);
  }
};
document
.querySelector(".search button")
.addEventListener("click",function(){
  weather.search();
});

document
.querySelector(".search-box")
.addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    weather.search();
  }

});

weather.fetchWeather("Delhi");
