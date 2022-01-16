window.onload = function() {
    let request = new XMLHttpRequest();

    function reqReadyStateChange() {
        if (request.readyState == 4) {
            let status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "update";

    let body = "type=" + type;
    request.open("GET", "http://localhost:63342/Lab1/assets/scripts/php/function.php?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    clearFields();
};


function validationX(x) {
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
    if (
        !(y < -3 || y > 5) &&
        /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.test(y) &&
        y == /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(y)[0]
    ) {
        return true;
    }
    return false;
}

function validationR(r) {
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

var button_x = document.querySelector('div[class="x_input"]');
button_x.addEventListener('click', function (event) {
    if (event.target.matches('button[name="x"]')) {
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

var radio_r = document.querySelector('div[class="r_input"]');
radio_r.addEventListener('click', function (event) {
    if (event.target.matches('input[name="r"]')) {
        document.querySelector('input[id="r"]').value = event.target.value;
        assignColorR();
    }
});


var text = document.querySelector('a[class="name"]');
text.addEventListener('click', function () {
    if (document.querySelector('a[class="student"]').style.color == "white") {
        document.querySelector('a[class="student"]').style.color = "#430009";
    } else {
        document.querySelector('a[class="student"]').style.color = "white";
    }
});

var submitB = document.querySelector('button[class="btn submit"]');
submitB.addEventListener("click", submit);

var clearB = document.querySelector('button[class="btn clear"]')
clearB.addEventListener("click", clearTable);

function submit() {
    if (
        !validationX(document.querySelector('input[id="x"]').value) ||
        !validationY(document.querySelector('input[id="y"]').value) ||
        !validationR(document.querySelector('input[id="r"]').value)
    ) {
        alert("Введите корректные данные");
        return;
    }

    var request = new XMLHttpRequest();

    function reqReadyStateChange() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = request.responseText;
            }
        }
    }

    let type = "check";
    let x = document.querySelector("input[id='x']").value;
    let y = document.querySelector("input[id='y']").value;
    let r = document.querySelector("input[id='r']").value;

    let pointer = document.querySelector('circle[id="point"]');
    pointer.style.visibility = "visible";
    pointer.setAttribute("cx", 200 + 150 / r * x);
    pointer.setAttribute("cy", 200 - 150 / r * y);

    let body = "type=" + type + "&x=" + x + "&y=" + y + "&r=" + r;
    request.open("GET", "http://localhost:63342/Lab1/assets/scripts/php/function.php?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    clearFields();
}

function clearTable() {
    let request = new XMLHttpRequest();

    function reqReadyStateChange() {
            if (request.readyState == 4) {
                let status = request.status;
                if (status == 200) {
                    document.getElementById("output").innerHTML = request.responseText;
                }
            }
    }

    let type = "clear";

    let body = "type=" + type;
    request.open("GET", "http://localhost:63342/Lab1/assets/scripts/php/function.php?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send();
    clearFields();
}

function clearFields() {
    let x = document.querySelector('input[name="x__result"]');
    x.value = "";
    assignColorX();
    let y = document.querySelector('input[name="y__result"]');
    y.value = "";
    assignColorY();
    document.querySelector('input[name="y"]').value = "";
    let r = document.querySelector('input[name="r__result"]');
    r.value = "";
    assignColorR();
    let a = document.getElementsByName("r");
    for (let b = 0; b < a.length; b++) {
        if (a[b].type == 'radio') {
            a[b].checked = false;
        }
    }
}

window.addEventListener('resize', function(event){
    if (window.innerWidth <= 1120){
        document.querySelector('div[class="zone_screen"]').style.position = "relative";
        document.querySelector('div[class="zone_result"]').style.position = "relative";
        document.querySelector('div[class="zone_screen"]').style.marginLeft = "590px";
        document.querySelector('div[class="zone_result"]').style.marginLeft = "590px";
    }
    if (window.innerWidth > 1120){
        document.querySelector('div[class="zone_screen"]').style.position = "absolute";
        document.querySelector('div[class="zone_result"]').style.position = "absolute";
    }
});
