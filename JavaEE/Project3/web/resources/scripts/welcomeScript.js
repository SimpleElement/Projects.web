let date = document.getElementById("date");
let time = document.getElementById("clock");

window.onload = function () {
    setScreenResolutionWidth();
    setScreenResolutionHeight();
    date.textContent = new Date().toLocaleDateString().toString();
    time.textContent = new Date().toLocaleTimeString().toString();
}

window.addEventListener('resize', function (event) {
    setScreenResolutionWidth();
    setScreenResolutionHeight();
});

function setScreenResolutionWidth() {
    let sizeIndent = window.innerWidth - 265;
    document.querySelector('div[class="main"]').style.left = sizeIndent + "px";
}

function setScreenResolutionHeight() {
    let sizeIndent = window.innerHeight - 50;
    document.querySelector('div[class="student"]').style.top = sizeIndent + "px";
}

date.textContent=new Date().toLocaleDateString().toString()
time.textContent=new Date().toLocaleTimeString().toString()
setInterval(() => {
    date.textContent = new Date().toLocaleDateString().toString()
    time.textContent = new Date().toLocaleTimeString().toString()
}, 9000)