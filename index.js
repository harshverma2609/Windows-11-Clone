
// TO CHANGE WALLPAPER AFTER EVERY 10 SECONDS WITH ANIMATION OF 2 SEC
function changeWallpaper(){
    let num=Math.floor(Math.random()*10)+1;
    let wallpaperURL="./Wallpapers/img"+num+".jpg";
    
    $("#wallpaper").fadeOut(1000);
    setTimeout(() => {
        // $("#wallpaper").src=wallpaperURL;
        document.getElementById("wallpaper").src=wallpaperURL;
    }, 1000);
    $("#wallpaper").fadeIn(1000);
}
function startTimer() {
    setInterval(changeWallpaper, 10000);
    setInterval(dateTime,1000);
    getWeather();
}

// LIVE DATE TIME
function dateTime(){
    let d=new Date();
    let date=String(d.getDate()).padStart(2, '0');;
    let month=String(d.getMonth()).padStart(2, '0');
    let year=d.getFullYear();
    let minute=String(d.getMinutes()).padStart(2, '0');
    let hour=String(d.getHours()).padStart(2, '0');
    document.getElementById("time").innerHTML=hour + ":" + minute;
    document.getElementById("date").innerHTML=date + "-" + month + "-" + year;
}

// WEATHER API
function getWeather(){
    const apiKey='e5921ea74bbd87461a31535fc5ad82cf';
    const city=document.getElementById('searchText').value;

    if(!city){
        console.log('enter city name!');
        return;
    }
    const currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current Weather data:', error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
        });
}
function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForecastDiv=document.getElementById('hourly-forecast');
    
    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`
    } else {
        const cityName=data.name;
        const temperature=Math.round(data.main.temp - 273.15);
        const description=data.weather[0].description;
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML=`<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML=temperatureHTML;
        weatherInfoDiv.innerHTML=weatherHTML;
        weatherIcon.src=iconUrl;
        weatherIcon.alt=description;

        document.getElementById('weather-icon').style.display='block';
    }
}
function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv=document.getElementById('hourly-forecast');
    const next24Hours=hourlyData.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime=new Date(item.dt*1000);
        const hour=dateTime.getHours();
        const temperature=Math.round(item.main.temp - 273.15);
        const iconCode=item.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML=`
            <div class="hourly-item">
                <span> ${hour}:00 </span>
                <img src="${iconUrl}" alt="hourly weather icon">
                <span> ${temperature}°C </span>
            </div>
        `;
        hourlyForecastDiv.innerHTML+=hourlyItemHTML;
    });
}

// CALCULATOR
function Solve(val) {
    var input = document.getElementById('res');
    input.value += val;
}
function Result() {
    var num1 = document.getElementById('res').value;
    var num2 = eval(num1);
    document.getElementById('res').value = num2;
}
function Clear() {
    var input = document.getElementById('res');
    input.value = '';
}
function Back() {
    var input = document.getElementById('res');
    input.value = input.value.slice(0,-1);
}

// TO HIDE SHOW FUNCTION
document.getElementById('calc').style.display="none";
document.getElementById('weather').style.display="none";

function display(id){
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        startMenu.style.bottom = "-650px"
        widgetMenu.style.left = "-950px"
        searchMenu.style.bottom = "-650px"
        // document.getElementById('calc').style.display="none";
        // document.getElementById('weather').style.display="none";
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

// FUNCTIONALITY TO ICONS
let startButton = document.getElementById("start");
let startMenu = document.getElementsByClassName("startmenu")[0];
let searchButton = document.getElementById("search");
let searchMenu = document.getElementsByClassName("searchmenu")[0];
let widgetButton = document.getElementById("widget");
let widgetMenu = document.getElementsByClassName("widgetmenu")[0];

startButton.addEventListener("click",()=>{
    if(startMenu.style.bottom == "-650px"){
        widgetMenu.style.left = "-950px"
        searchMenu.style.bottom = "-650px"
        document.getElementById('calc').style.display="none";
        document.getElementById('weather').style.display="none";
        startMenu.style.bottom = "55px"
    }else{
        startMenu.style.bottom = "-650px"
    }
})

searchButton.addEventListener("click",()=>{
    if(searchMenu.style.bottom == "-650px"){
        widgetMenu.style.left = "-950px"
        startMenu.style.bottom = "-650px"
        document.getElementById('calc').style.display="none";
        document.getElementById('weather').style.display="none";
        searchMenu.style.bottom = "55px"
    }else{
        searchMenu.style.bottom = "-650px"
    }
})

widgetButton.addEventListener("click",()=>{
    if(widgetMenu.style.left == "-950px"){
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "-650px"
        document.getElementById('calc').style.display="none";
        document.getElementById('weather').style.display="none";
        widgetMenu.style.left = "0px"
    }else{
        widgetMenu.style.left = "-950px"
    }
})

