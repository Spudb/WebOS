/*const icon = document.querySelector(".icon");*/
const picon = document.getElementById("picon")
const aicon = document.getElementById("aicon")
const ficon = document.getElementById("ficon")
const mwindow = document.querySelector(".mwindow");
const awindow = document.querySelector(".awindow");
const fwindow = document.querySelector(".fwindow");
const mcloseBtn = document.querySelector(".mwindow button");
const acloseBtn = document.querySelector(".awindow button");
const fcloseBtn = document.querySelector(".fwindow button");

picon.addEventListener("click", function(){mwindow.style.display = "block"});
mcloseBtn.addEventListener("click", function(){mwindow.style.display = "none"});

aicon.addEventListener("click", function(){awindow.style.display = "block"});
acloseBtn.addEventListener("click", function(){awindow.style.display = "none"});

ficon.addEventListener("click", function(){fwindow.style.display = "block"});
fcloseBtn.addEventListener("click", function(){fwindow.style.display = "none"});