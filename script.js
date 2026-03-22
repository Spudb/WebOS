const picon = document.getElementById("picon")
const sicon = document.getElementById("sicon")
const aicon = document.getElementById("aicon")
const ficon = document.getElementById("ficon")
const mwindow = document.querySelector(".mwindow");
const swindow = document.querySelector(".swindow");
const awindow = document.querySelector(".awindow");
const fwindow = document.querySelector(".fwindow");
const mcloseBtn = document.querySelector(".mwindow .closeBtn");
const scloseBtn = document.querySelector(".swindow .closeBtn");
const acloseBtn = document.querySelector(".awindow .closeBtn");
const fcloseBtn = document.querySelector(".fwindow .closeBtn");
const mwindowT = document.querySelector(".mwindow-titlebar");
const swindowT = document.querySelector(".swindow-titlebar");
const awindowT = document.querySelector(".awindow-titlebar");
const fwindowT = document.querySelector(".fwindow-titlebar");
const canvas = document.getElementById("matrix")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var fontS = 14
var columns = Math.floor(canvas.width / fontS)
var drops = Array(columns).fill(1)
var clock = document.getElementById("clock");
var bootscreen = document.querySelector(".bootscreen")
var loadingfill = document.querySelector(".loadingfill")
var loginscreen = document.querySelector(".loginscreen")
var loginBtn = document.getElementById("loginBtn")
var desktop = document.querySelector(".desktop")
var allWindows = [mwindow, swindow, awindow, fwindow]
var taskbarC = document.querySelector(".taskbarC")

picon.addEventListener("click", function(){mwindow.style.display = "block", focusWindow(mwindow), addIndicator("Projects", mwindow, "icons/icons8-folder-96.png")});
mcloseBtn.addEventListener("click", function(){mwindow.style.display = "none", removeIndicator("Projects")});

sicon.addEventListener("click", function(){swindow.style.display = "block", focusWindow(swindow), addIndicator("Market", swindow, "icons/icons8-market-96.png")});
scloseBtn.addEventListener("click", function(){swindow.style.display = "none", removeIndicator("Market")});

aicon.addEventListener("click", function(){awindow.style.display = "block", focusWindow(awindow), addIndicator("About", awindow, "icons/icons8-about-100.png")});
acloseBtn.addEventListener("click", function(){awindow.style.display = "none", removeIndicator("About")});

ficon.addEventListener("click", function(){fwindow.style.display = "block", focusWindow(fwindow), addIndicator("FAQ", fwindow, "icons/icons8-notepad-96.png")});
fcloseBtn.addEventListener("click", function(){fwindow.style.display = "none", removeIndicator("FAQ")});

loginBtn.addEventListener("click", function(){loginscreen.style.opacity = "0", desktop.style.display = "block", setTimeout(function(){loginscreen.style.display = "none"}, 800)});

function updateClock() {
    var now = new Date()
    var hours = now.getHours()
    var ampm = "" 
    if(hours < 12){
        ampm = "AM"
    }
    else{
        ampm = "PM"
    }
    if(hours > 12){
        hours = hours - 12
    }
    if(hours == 0){
        hours = 12
    }
    var minutes = now.getMinutes().toString().padStart(2, "0")
    var day = now.getDate()
    var month = now.getMonth() + 1
    var year = now.getFullYear()
    var date = month + "/" + day + "/" + year
    clock.innerHTML = hours + ":" + minutes + " " + ampm + "<br/>" + date 
}


updateClock()
setInterval(updateClock, 1000)


loadingfill.style.width = "100%"
setTimeout(function() {bootscreen.style.opacity = "0", loginscreen.style.display = "flex"}, 3000)
setTimeout(function() {bootscreen.style.display = "none"}, 3800)


var drawmatrix = function drawmatrix() {
    ctx.fillStyle = "rgba(8, 0, 16, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#cc1133"
    ctx.font = fontS + "px monospace"
    for(var i = 0; i < columns; i++) {
        var char = String.fromCharCode(Math.floor(Math.random() * 128))
        ctx.fillText(char, i * fontS, drops[i] * fontS)
        if(drops[i] * fontS > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
        }
        drops[i]++
    }
}
setInterval(drawmatrix, 35)


function focusWindow(win){
    for(var i = 0; i < allWindows.length; i++) {
        allWindows[i].style.zIndex = "10"
    }
    win.style.zIndex = "20"
}

mwindow.addEventListener("mousedown", function(){focusWindow(mwindow)})
swindow.addEventListener("mousedown", function(){focusWindow(swindow)})
awindow.addEventListener("mousedown", function(){focusWindow(awindow)})
fwindow.addEventListener("mousedown", function(){focusWindow(fwindow)})

function windowBhvr(win, titlebar, maxBtn) {
    var isDragging = false
    var offsetX = 0
    var offsetY = 0
    var isMaximized = false

    /*To make the windows able to be maximized*/
    maxBtn.addEventListener("click", function(){if (isMaximized == false){
        win.style.width = "100vw"
        win.style.height = "100vh"
        win.style.top = "0"
        win.style.left = "0"
        win.style.borderRadius = "0"
        win.style.transform = "none"
        maxBtn.innerText = "❐"
        isMaximized = true
    } else{
        win.style.width = "500px"
        win.style.height = "350px"
        win.style.top = "calc(50% - 175px)"
        win.style.left = "calc(50% - 250px)"
        win.style.borderRadius = "8px"
        maxBtn.innerText = "□"
        isMaximized = false
    }})

    /*To make the windows able to be dragged*/
    titlebar.addEventListener("mousedown", function(event) {
        if(event.target.tagName === "BUTTON") return
        if(isMaximized == true){
            win.style.width = "500px"
            win.style.height = "350px"
            win.style.left = event.clientX - 250 + "px"
            win.style.top = event.clientY - 17 + "px"
            win.style.borderRadius = "8px"
            maxBtn.innerText = "□"
            isMaximized = false
        }
        isDragging = true
        offsetX = event.clientX - win.offsetLeft
        offsetY = event.clientY - win.offsetTop
    })
    
    document.addEventListener("mousemove", function(event) {
        if(isDragging == true){
            win.style.left = event.clientX - offsetX + "px"
            win.style.top = event.clientY - offsetY + "px"
        }
    })
    
    document.addEventListener("mouseup", function(event){
        isDragging = false
    } )
}

windowBhvr(mwindow, mwindowT, document.querySelector(".mwindow .maxBtn"))
windowBhvr(swindow, swindowT, document.querySelector(".swindow .maxBtn"))
windowBhvr(awindow, awindowT, document.querySelector(".awindow .maxBtn"))
windowBhvr(fwindow, fwindowT, document.querySelector(".fwindow .maxBtn"))

function addIndicator(name, win, iconSrc){
    if(document.getElementById(name + "-indicator")) return
    var indicator = document.createElement("div")
    var img = document.createElement("img")
    img.src = iconSrc
    img.style.width = "20px"
    img.style.height = "20px"
    indicator.className = "indicator"
    indicator.id = name + "-indicator"
    indicator.addEventListener("click", function(){focusWindow(win)})
    indicator.appendChild(img)
    taskbarC.appendChild(indicator)
}

function removeIndicator(name){
    var indicator = document.getElementById(name + "-indicator")
    indicator.remove()
}