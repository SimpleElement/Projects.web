let x;
let y;
let r;

window.onload = function () {
    setScreenResolution();
    drawAxis();
}

window.addEventListener('resize', function (event) {
    setScreenResolution();
});


var submit_button = document.getElementById("submit")
submit_button.addEventListener("click", function (e) {
    if (!validationX(x)) {
        setRedColorX();
    }
    if (!validationY(document.querySelector('input[name="y"]').value)) {
        document.querySelector('legend[class="y_table"]').style.color = "red";
    }
    if (!validationR(r)) {
        setRedColorR();
    }
    if (!validationX(x) || !validationY(y) || !validationR(r)) {
        return;
    }

    $(".pointX").val(x);
    $(".pointY").val(y);
    $(".pointR").val(r);
    $(".submitSvg").click();

    points.push({'color': checkArea(x, y, r) ? "green" : "red",'x': x, 'y': y, 'r': r});
    drawFigures(r);
});

function clearFields() {
    points = [];
    drawFigures(r);
}

canvas.addEventListener("click", function (e) {
    if (r === undefined) {
        setRedColorR();
        return;
    }
    savePoint(e.layerX, e.layerY, r);

    $(".pointX").val(((e.layerX - 225)/40));
    $(".pointY").val(((225 - e.layerY)/40));
    $(".pointR").val(r);
    $(".submitSvg").click();
    drawFigures(r);
});

function setScreenResolution() {
    let sizeIndent = window.innerWidth - 560;
    if (window.innerHeight < 963) sizeIndent = window.innerWidth - 575;
    if (window.innerWidth > 1165) {
        document.querySelector('div[class="screen_zone"]').style.left = sizeIndent + "px";
        document.querySelector('div[class="result_zone"]').style.left = sizeIndent + "px";
    } else {
        document.querySelector('div[class="screen_zone"]').style.left = "590px";
        document.querySelector('div[class="result_zone"]').style.left = "590px";
    }
}

var button_x = document.querySelector('div[class="x_table__div"]');
button_x.addEventListener('click', function (event) {
    if (event.target.name === "x1" ||
        event.target.name === "x2" ||
        event.target.name === "x3" ||
        event.target.name === "x4" ||
        event.target.name === "x5" ||
        event.target.name === "x6" ||
        event.target.name === "x7" ||
        event.target.name === "x8" ||
        event.target.name === "x9"
    ) {
        clearColorX();
        document.querySelector('legend[class="x_table"]').style.color = "black";
        x = event.target.value;
        event.target.style.border = "2px solid green";
    }
});

var input_y = document.querySelector('input[name="y"]');
input_y.addEventListener('keyup', function (event) {
    y = event.target.value;
    setColorY();
});

var button_r = document.querySelector('div[class="r_table__div"]');
button_r.addEventListener('click', function (event) {
    if (event.target.name === "r1" ||
        event.target.name === "r2" ||
        event.target.name === "r3" ||
        event.target.name === "r4" ||
        event.target.name === "r5"
    ) {
        clearColorR();
        document.querySelector('legend[class="r_table"]').style.color = "black";
        r = event.target.value;
        event.target.style.border = "2px solid green";
        drawFigures(r);
    }
});

function setRedColorX() {
    document.querySelector('legend[class="x_table"]').style.color = "red";

}
function setColorY() {
    if (y == "") {
        document.querySelector('legend[class="y_table"]').style.color = "black";
        return;
    }
    if (validationY(y)) {
        document.querySelector('legend[class="y_table"]').style.color = "black";
        return;
    }
    document.querySelector('legend[class="y_table"]').style.color = "red";

}

function setRedColorR() {
    document.querySelector('legend[class="r_table"]').style.color = "red";
}

function clearColorX() {
    document.getElementById("x1").style.border = "";
    document.getElementById("x2").style.border = "";
    document.getElementById("x3").style.border = "";
    document.getElementById("x4").style.border = "";
    document.getElementById("x5").style.border = "";
    document.getElementById("x6").style.border = "";
    document.getElementById("x7").style.border = "";
    document.getElementById("x8").style.border = "";
    document.getElementById("x9").style.border = "";
}

function clearColorY() {

}

function clearColorR() {
    document.getElementById("r1").style.border = "";
    document.getElementById("r2").style.border = "";
    document.getElementById("r3").style.border = "";
    document.getElementById("r4").style.border = "";
    document.getElementById("r5").style.border = "";
}

function validationX(x) {
    if (x == "") return false;
    if (
        x == 5 ||
        x == 4 ||
        x == 3 ||
        x == 2 ||
        x == 1 ||
        x == 0 ||
        x == -1 ||
        x == -2 ||
        x == -3
    ) {
        return true;
    }
    return false;
}

function validationY(y) {
    if (y == "") return false;
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
    if (r == "") return false;
    if (
        r == 1 ||
        r == 1.5 ||
        r == 2 ||
        r == 2.5 ||
        r == 3
    ) {
        return true;
    }
    return false;
}