window.onload = function () {
    setScreenResolution();
}

window.addEventListener('resize', function (event) {
    setScreenResolution();
});

async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Basic '+btoa(sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"))
        },
        body: JSON.stringify(data)
    })
}

async function getData(url, data) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Basic '+btoa(sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"))
        }
    })
}

function validationX(x) {
    if (x == "" || x == undefined) return false;
    if (
        x == -4 ||
        x == -3 ||
        x == -2 ||
        x == -1 ||
        x == 0 ||
        x == 1 ||
        x == 2 ||
        x == 3 ||
        x == 4
    ) {
        return true;
    }
    return false;
}

function validationY(y) {
    if (y == "" || y == undefined) return false;
    if (
        !(y < -3 || y > 3) &&
        /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.test(y) &&
        y == /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(y)[0]
    ) {
        return true;
    }
    return false;
}

function validationR(r) {
    if (r == "" || r == undefined) return false;
    if (
        r == -4 ||
        r == -3 ||
        r == -2 ||
        r == -1 ||
        r == 0 ||
        r == 1 ||
        r == 2 ||
        r == 3 ||
        r == 4
    ) {
        return true;
    }
    return false;
}

function setScreenResolution() {
    let windowWidth = window.innerWidth;

    if (windowWidth < 625) {
        if (windowWidth < 480) {
            document.querySelector('div[class="input__zone"]').style.left = 0 + "px";
            document.querySelector('div[class="screen__zone"]').style.left = 0 + "px";
            document.querySelector('div[class="result__zone"]').style.left = 0 + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 850 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 1370 + "px";
        } else {
            let sizeIndent = (window.innerWidth - 450) / 2;
            document.querySelector('div[class="input__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="screen__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="result__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 850 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 1370 + "px";
        }
    } else if (625 <= windowWidth && windowWidth < 1040) {
        if (windowWidth < 1000) {
            let sizeIndent = (window.innerWidth - 450) / 2;
            document.querySelector('div[class="input__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="screen__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="result__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 850 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 1370 + "px";
        } else {
            let sizeIndent = (window.innerWidth - 900) / 2;
            document.querySelector('div[class="input__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="screen__zone"]').style.left = (sizeIndent + 470) + "px";
            document.querySelector('div[class="result__zone"]').style.left = (sizeIndent + 470) + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 530 + "px";
        }
    } else {
        if (windowWidth < 1500) {
            let sizeIndent = (window.innerWidth - 900) / 2;
            document.querySelector('div[class="input__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="screen__zone"]').style.left = (sizeIndent + 470) + "px";
            document.querySelector('div[class="result__zone"]').style.left = (sizeIndent + 470) + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 530 + "px";
        } else {
            let sizeIndent = (window.innerWidth - 460)
            document.querySelector('div[class="input__zone"]').style.left = 5 + "px";
            document.querySelector('div[class="screen__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="result__zone"]').style.left = sizeIndent + "px";
            document.querySelector('div[class="input__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="screen__zone"]').style.top = 10 + "px";
            document.querySelector('div[class="result__zone"]').style.top = 530 + "px";
        }
    }
}