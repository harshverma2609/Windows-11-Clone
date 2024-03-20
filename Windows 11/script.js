
// TO CHANGE WALLPAPER AFTER EVERY 10 SECONDS WITH ANIMATION OF 2 SEC
function changeWallpaper(){
    let num = Math.floor(Math.random() * 10) + 1;
    let wallpaperURL = "./Wallpapers/img" + num + ".jpg";

    $("#wallpaper").fadeOut(1000, function() {
        $(this).attr("src", wallpaperURL).fadeIn(1000);
    });
}

function startTimer() {
    setInterval(changeWallpaper, 10000);
    setInterval(dateTime,1000);
    getWeather();
}

// LIVE DATE TIME
function dateTime(){
    let d = new Date();
    let date = String(d.getDate()).padStart(2, '0');
    let month = String(d.getMonth()+1).padStart(2, '0');
    let year = d.getFullYear();
    let minute = String(d.getMinutes()).padStart(2, '0');
    let hour = String(d.getHours()).padStart(2, '0');
    $("#time").text(hour + ":" + minute);
    $("#date").text(date + "-" + month + "-" + year);
}

// WEATHER API
function getWeather(){
    const apiKey = 'e5921ea74bbd87461a31535fc5ad82cf';
    const city = $('#searchText').val();

    if(!city){
        console.log('enter city name!');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
        url: currentWeatherUrl,
        method: 'GET',
        success: function(data) {
            displayWeather(data);
        },
        error: function(error) {
            console.error('Error fetching current Weather data:', error);
        }
    });

    $.ajax({
        url: forecastUrl,
        method: 'GET',
        success: function(data) {
            displayHourlyForecast(data.list);
        },
        error: function(error) {
            console.error('Error fetching hourly forecast data:', error);
        }
    });
}

function displayWeather(data){
    const tempDivInfo = $('#temp-div');
    const weatherInfoDiv = $('#weather-info');
    const weatherIcon = $('#weather-icon');
    const hourlyForecastDiv = $('#hourly-forecast');

    weatherInfoDiv.empty();
    hourlyForecastDiv.empty();
    tempDivInfo.empty();

    if(data.cod === '404'){
        weatherInfoDiv.html(`<p>${data.message}</p>`);
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.html(temperatureHTML);
        weatherInfoDiv.html(weatherHTML);
        weatherIcon.attr('src', iconUrl).attr('alt', description);

        weatherIcon.css('display', 'block');
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = $('#hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span> ${hour}:00 </span>
                <img src="${iconUrl}" alt="hourly weather icon">
                <span> ${temperature}°C </span>
            </div>
        `;
        hourlyForecastDiv.append(hourlyItemHTML);
    });
}

// CALCULATOR
function Solve(val) {
    var input = $('#res');
    input.val(input.val() + val);
}

function Result() {
    var num1 = $('#res').val();
    var num2 = eval(num1);
    $('#res').val(num2);
}

function Clear() {
    $('#res').val('');
}

function Back() {
    var input = $('#res');
    input.val(input.val().slice(0,-1));
}

// TO HIDE SHOW FUNCTION
$('#calc').hide();
$('#weather').hide();

function display(id){
    var x = $("#" + id);
    if (x.css("display") === "none") {
        $(".menu").hide();
        x.show();
    } else {
        x.hide();
    }
}

$('.menu-button').click(function(){
    var menuId = $(this).data('menu');
    display(menuId);
});
