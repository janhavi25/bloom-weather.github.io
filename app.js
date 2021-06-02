// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// ec82e956caf521ffb14f3190f1b59117

const weatherApi={
    // key:"bab281d79e5f1e9755a68d754cc313e7",
    key:"ec82e956caf521ffb14f3190f1b59117",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode==13){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(`.weather-body`).style.display="block";
}

});
//get weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather){
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML=`${Math.round(weather.main.temp-273.15)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min-273.15)}&deg;C(min)/${Math.ceil(weather.main.temp_max-273.15)}&deg;C(max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('images/sunny image.jpg')";
    }
   else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage="url('images/cloudy.jpg')";
    }
    else if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage="url('images/thunder.jpg')";
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage="url('images/rainy.jpg')";
    }
    else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage="url('images/snow.jpg')";
    }

}

//get reports
//show reports
//date manager
function dateManage(dataArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year = dataArg.getFullYear();
    let month = months[dataArg.getMonth()];
    let date = dataArg.getDate();
    let day = days[dataArg.getDay()];
    // let hr = dataArg.getHours();
    // let min = dataArg.getMinutes();
    // let sec = dataArg.getSeconds();
    return`${date} ${month} (${day}), ${year} `;

}