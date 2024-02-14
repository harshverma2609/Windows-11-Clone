
// TO CHANGE WALLPAPER AFTER EVERY 10 SECONDS WITH ANIMATION OF 2 SEC
function changeWallpaper(){
    let num=Math.floor(Math.random()*10)+1;
    let wallpaperURL="./Wallpapers/img"+num+".jpg";
    
    $("#wallpaper").fadeOut(1000);
    setTimeout(() => {
        $("#wallpaper").src=wallpaperURL;
        // document.getElementById("wallpaper").src=wallpaperURL;
    }, 1000);
    $("#wallpaper").fadeIn(1000);
}
function startTimer() {
    setInterval(changeWallpaper, 10000);
    setInterval(dateTime,1000);
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

// CALCULATOR
function Solve(val) {
    var v = document.getElementById('res');
    v.value += val;
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
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0,-1);
}

// TO HIDE SHOW FUNCTION
function display(id){
    var x = document.getElementById(id);
    if (x.style.display === "none") {
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
        startMenu.style.bottom = "55px"
    }else{
        startMenu.style.bottom = "-650px"
    }
})

searchButton.addEventListener("click",()=>{
    if(searchMenu.style.bottom == "-650px"){
        widgetMenu.style.left = "-950px"
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "55px"
    }else{
        searchMenu.style.bottom = "-650px"
    }
})

widgetButton.addEventListener("click",()=>{
    if(widgetMenu.style.left == "-950px"){
        startMenu.style.bottom = "-650px"
        searchMenu.style.bottom = "-650px"
        widgetMenu.style.left = "0px"
    }else{
        widgetMenu.style.left = "-950px"
    }
})

