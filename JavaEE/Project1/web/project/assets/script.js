window.onload = function () {
    setScreenResolution();
    document.querySelector("select[name='select']").value = "";
}

window.addEventListener('resize', function (event) {
    setScreenResolution();
});

var points = [];
var graph = document.querySelector('div[class="graph"]');
graph.addEventListener("click", function (e) {
    if (document.getElementById("r").value == "") return;
    points.push({'x': e.layerX, 'y': e.layerY, 'r': document.getElementById("r").value });

    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "check";
    let pointer = document.querySelector('circle[id="point"]');
    let x = document.getElementById("r").value * (e.layerX - 225) / 180;
    let y = document.getElementById("r").value * (225 - e.layerY) / 180;
    let body = "type=" + type + "&x=" + x + "&y=" + y + "&r=" + document.getElementById("r").value;
    request.open("GET", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    printPoints();
})

function printPoints() {
    let pointsHTML = "";
    for (let k = 0; k < points.length; k++) {
        pointsHTML = pointsHTML + "<circle r=\"3\" cx=\"" + (((points[k].x - 225) * document.getElementById("r").value / points[k].r) + 225) + "\" cy=\"" + (((points[k].y - 225) * document.getElementById("r").value / points[k].r) + 225) + "\" fill-opacity=\"1\" fill=\"#2c2544\" stroke=\"black\" visibility=\"visible\"></circle>"
    }
    document.querySelector('svg[class="points"]').innerHTML = pointsHTML;
}

var push_submit = document.querySelector('button[class="btn submit"]');
push_submit.addEventListener("click", function () {
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    let r = document.getElementById("r").value;
    if (!validationX(x)) {
        document.querySelector('input[id="x"]').style.borderColor = "red";
    }
    if (!validationY(y)) {
        document.querySelector('input[id="y"]').style.borderColor = "red";
    }
    if (!validationR(r)) {
        document.querySelector('input[id="r"]').style.borderColor = "red";
    }
    if (!validationX(x) || !validationY(y) || !validationR(r)) {
        return;
    }

    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "check";
    let pointer = document.querySelector('circle[id="point"]');
    let body = "type=" + type + "&x=" + x + "&y=" + y + "&r=" + r;
    request.open("GET", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    points.push({'x': 225 + 180 / r * x, 'y': 225 - 180 / r * y, 'r': r });
    printPoints();
    clearFields();
})

var push_clear = document.querySelector('button[class="btn clear"]');
push_clear.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "clear";
    let pointer = document.querySelector('circle[id="point"]');
    let body = "type=" + type;
    request.open("GET", "http://localhost:8080/WebLab2_server_war/controllerServlet?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();

    points = [];
    printPoints();
    clearFields();
})


var push_x = document.querySelector('div[class="x_div"]');
push_x.addEventListener('click', function (event) {
    if (event.target.matches('input[name="x"]')) {
        document.querySelector('input[id="x"]').value = event.target.value;
        assignColorX();
    }
});

var elementY = document.querySelector('input[name="y"]');
elementY.addEventListener('keyup', appointY);
function appointY() {
    let inputCountClick = document.querySelector('input[name="y__result"]');
    inputCountClick.value = elementY.value;
    assignColorY();
}

var push_r = document.querySelector('select[name="select"]');
push_r.addEventListener('change', function (event) {
    if (event.target.matches('select[name="select"]')) {
        document.querySelector('input[id="r"]').value = event.target.value;
        setGraph(event.target.value);
        assignColorR();
        printPoints();
    }
});


function setScreenResolution() {
    let sizeIndent = window.innerWidth - 560;
    if (window.innerHeight < 963) sizeIndent = window.innerWidth - 575;
    if (window.innerWidth > 1165) {
        document.querySelector('div[class="screen__zone"]').style.left = sizeIndent + "px";
        document.querySelector('div[class="result__zone"]').style.left = sizeIndent + "px";
    } else {
        document.querySelector('div[class="screen__zone"]').style.left = "590px";
        document.querySelector('div[class="result__zone"]').style.left = "590px";
    }
}

function setGraph(r) {
    let x;
    x = document.querySelector("polygon[id='1']");
    x.setAttribute("points", 225 + "," + (225 + 30 * r) + " " + 225 + "," + 225 + " " + (225 + 60 * r) + "," + 225 + " " + (225 + 60 * r) + "," + (225 + 30 * r));

    x = document.querySelector("polygon[id='2']");
    x.setAttribute("points", 225 + "," + 225 + " " + (225 + 30 * r) + "," + 225 + " " + 225 + "," + ((225 - 30 * r)));

    x = document.querySelector("path[id='3']");
    x.setAttribute("d", "M" + (225 - 30 * r) + "," + 225 + " A" + (30*r) + "," + (30 *r) + " " + 90 + " " + 0 + "," + 1 + " " + 225 + "," + (225 - 30 * r) + " L " + 225 + "," + 225 + " Z");

}

function validationX(x) {
    if (x == "") return false;
    if (
        x == -3 ||
        x == -2 ||
        x == -1 ||
        x == 0 ||
        x == 1 ||
        x == 2 ||
        x == 3 ||
        x == 4 ||
        x == 5
    ) {
        return true;
    }
    return false;
}

function validationY(y) {
    if (y == "") return false;
    if (
        !(y < -5 || y > 3) &&
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

function assignColorX() {
    if (
        document.querySelector('input[id="x"]').value == ""
    ) {
        document.querySelector('input[id="x"]').style.borderColor = "black";
        return;
    }
    if (validationX(document.querySelector('input[id="x"]').value)) {
        document.querySelector('input[id="x"]').style.borderColor = "green";
        return;
    }
    document.querySelector('input[id="x"]').style.borderColor = "red";
}

function assignColorY() {
    if (
        document.querySelector('input[id="y"]').value == ""
    ) {
        document.querySelector('input[id="y"]').style.borderColor = "black";
        return;
    }
    if (validationY(document.querySelector('input[id="y"]').value)) {
        document.querySelector('input[id="y"]').style.borderColor = "green";
        return;
    }
    document.querySelector('input[id="y"]').style.borderColor = "red";
}

function assignColorR() {
    if (
        document.querySelector('input[id="r"]').value == ""
    ) {
        document.querySelector('input[id="r"]').style.borderColor = "black";
        return;
    }
    if (validationR(document.querySelector('input[id="r"]').value)) {
        document.querySelector('input[id="r"]').style.borderColor = "green";
        return;
    }
    document.querySelector('input[id="r"]').style.borderColor = "red";
}

function clearFields() {
    let x = document.querySelector('input[name="x__result"]');
    let a = document.getElementsByName("x");
    for (let b = 0; b < a.length; b++) {
        if (a[b].type == 'radio') {
            a[b].checked = false;
        }
    }
    x.value = "";
    assignColorX();
    let y = document.querySelector('input[name="y__result"]');
    y.value = "";
    assignColorY();
    document.querySelector('input[name="y"]').value = "";
}