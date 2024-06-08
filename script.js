// TO CHANGE WALLPAPER AFTER EVERY 10 SECONDS WITH ANIMATION OF 2 SEC
function changeWallpaper() {
    let num = Math.floor(Math.random() * 10) + 1;
    let wallpaperURL = "./Wallpapers/img" + num + ".jpg";

    $("#wallpaper").fadeOut(1000, function() {
        $("#wallpaper").attr("src", wallpaperURL).fadeIn(1000);
    });
}

function startTimer() {
    setInterval(changeWallpaper, 10000);
    setInterval(dateTime, 1000);
    getWeather();
    $(".startmenu").css("bottom", "-650px");
    $(".widgetmenu").css("left", "-1950px");
    $(".searchmenu").css("bottom", "-650px");
}

// LIVE DATE TIME
function dateTime() {
    let d = new Date();
    let date = String(d.getDate()).padStart(2, '0');
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let year = d.getFullYear();
    let minute = String(d.getMinutes()).padStart(2, '0');
    let hour = String(d.getHours()).padStart(2, '0');
    $("#time").text(hour + ":" + minute);
    $("#date").text(date + "-" + month + "-" + year);
}

// TO HIDE SHOW FUNCTION
$("#calc, #weather, #calendar").hide();

function display(id) {
    let x = $("#" + id);
    if (x.css("display") === "none") {
        $(".startmenu").css("bottom", "-650px");
        $(".widgetmenu").css("left", "-1950px");
        $(".searchmenu").css("bottom", "-650px");
        x.show();
    } else {
        x.hide();
    }
}

// WEATHER API
function getWeather() {
    const apiKey = 'e5921ea74bbd87461a31535fc5ad82cf';
    const city = $('#searchText').val();

    if (!city) {
        console.log('enter city name!');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.getJSON(currentWeatherUrl, displayWeather)
        .fail(error => console.error('Error fetching current Weather data:', error));

    $.getJSON(forecastUrl, data => displayHourlyForecast(data.list))
        .fail(error => console.error('Error fetching hourly forecast data:', error));
}

function displayWeather(data) {
    const tempDivInfo = $('#temp-div');
    const weatherInfoDiv = $('#weather-info');
    const weatherIcon = $('#weather-icon');
    const hourlyForecastDiv = $('#hourly-forecast');

    weatherInfoDiv.empty();
    hourlyForecastDiv.empty();
    tempDivInfo.empty();

    if (data.cod === '404') {
        weatherInfoDiv.html(`<p>${data.message}</p>`);
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.html(temperatureHTML);
        weatherInfoDiv.html(weatherHTML);
        weatherIcon.attr("src", iconUrl).attr("alt", description).show();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = $('#hourly-forecast');
    const next24Hours = hourlyData.slice(0, 7);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="hourly weather icon">
                <span>${temperature}°C</span>
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
    input.val(input.val().slice(0, -1));
}

// CALENDER
const header = $("#calendar h3");
const dates = $(".dates");
const navs = $("#prev, #next");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();

    let datesHtml = "";

    for (let i = start; i > 0; i--) {
        datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let day = 1; day <= endDate; day++) {
        let isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        let className = isToday ? ' class="today"' : "";
        datesHtml += `<li${className}>${day}</li>`;
    }

    for (let i = end; i < 6; i++) {
        datesHtml += `<li class="inactive">${i - end + 1}</li>`;
    }

    dates.html(datesHtml);
    header.text(`${months[month]} ${year}`);
}

navs.each(function() {
    $(this).on("click", function(e) {
        const btnId = e.target.id;

        if (btnId === "prev" && month === 0) {
            year--;
            month = 11;
        } else if (btnId === "next" && month === 11) {
            year++;
            month = 0;
        } else {
            month = btnId === "next" ? month + 1 : month - 1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        renderCalendar();
    });
});

renderCalendar();

// FUNCTIONALITY TO ICONS
$("#start").on("click", function() {
    if ($(".startmenu").css("bottom") === "-650px") {
        $(".widgetmenu").css("left", "-1950px");
        $(".searchmenu").css("bottom", "-650px");
        $("#calc, #weather, #calendar").hide();
        $(".startmenu").css("bottom", "55px");
    } else {
        $(".startmenu").css("bottom", "-650px");
    }
});

$("#search").on("click", function() {
    if ($(".searchmenu").css("bottom") === "-650px") {
        $(".widgetmenu").css("left", "-1950px");
        $(".startmenu").css("bottom", "-650px");
        $("#calc, #weather, #calendar").hide();
        $(".searchmenu").css("bottom", "55px");
    } else {
        $(".searchmenu").css("bottom", "-650px");
    }
});

$("#widget").on("click", function() {
    if ($(".widgetmenu").css("left") === "-1950px") {
        $(".startmenu").css("bottom", "-650px");
        $(".searchmenu").css("bottom", "-650px");
        $("#calc, #weather, #calendar").hide();
        $(".widgetmenu").css("left", "0px");
    } else {
        $(".widgetmenu").css("left", "-1950px");
    }
});
