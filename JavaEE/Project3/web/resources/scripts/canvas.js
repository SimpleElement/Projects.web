let dash = 5;
let step = 40;
let width = 450;
let height = 450;
var points = [];

var canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

function drawFigures(r) {
    clearCanvas();

    drawAxis();
    drawRectangle(r * step);
    drawTriangle(r * step);
    drawCircle(r * step);
    drawPoints();
}

function drawAxis() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.globalAlpha = 1.0;
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    context.strokeText("Y", 240, 10);
    context.strokeText("X", 440, height / 2 - 10);
    context.stroke();
    //draw x-dash
    for (let i = -5; i <= 5; i++) {
        context.beginPath();
        let x = width / 2 + step * i;
        context.moveTo(x, height / 2 + dash);
        context.lineTo(x, height / 2 - dash);
        if (i !== 0) {
            context.fillText(i.toString(), x - dash / 2, height / 2 + 3 * dash);
        }
        context.stroke();
    }

    //draw y-dash
    for (let i = -5; i <= 5; i++) {
        context.beginPath();
        let y = height / 2 + step * i;
        context.moveTo(width / 2 + dash, y);
        context.lineTo(width / 2 - dash, y);
        if (i !== 0) {
            context.fillText((-i).toString(), width / 2 + dash, y + dash);
        }
        context.stroke();
    }
}

function drawTriangle(r) {
    context.fillStyle = "#1f76c7";
    context.globalAlpha = 0.6;
    context.beginPath();
    context.moveTo((width / 2) + r, height / 2);
    context.lineTo(width / 2, (height / 2) - r);
    context.lineTo(width / 2, height / 2);
    context.fill();
}

function drawCircle(r) {
    context.fillStyle = "#1f76c7";
    context.strokeStyle = "#1f76c7";
    context.globalAlpha = 0.6;
    context.beginPath();
    context.arc(width / 2, height / 2, r / 2, 4 * Math.PI / 2, 3 * Math.PI / 6 );
    context.lineTo(width / 2, height / 2)
    context.fill();
    context.stroke();
}

function drawRectangle(r) {
    context.fillStyle = "#1f76c7";
    context.strokeStyle = "#1f76c7";
    context.globalAlpha = 0.6;
    context.beginPath();
    context.fillRect(width / 2, height / 2, -r / 2, r);
}

function clearCanvas() {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function savePoint(x, y, r) {
    let color;
    if (checkArea((x - width / 2) / step, (height / 2 - y) / step, r)) {
        color = 'green';
    } else {
        color = 'red';
    }
    points.push({'color': color,'x': (x - width / 2) / step, 'y': (height / 2 - y) / step, 'r': r});
}

function drawPoints() {
    let canvas = document.getElementById('canvas');
    let chart = canvas.getContext('2d');
    for (let k = 0; k < points.length; k++) {
        chart.beginPath();
        chart.arc(canvas.width / 2 + points[k].x * step, canvas.height / 2 - points[k].y * step, 3, 0, Math.PI * 2);
        chart.fillStyle = points[k].color;
        chart.strokeStyle = points[k].color;
        chart.globalAlpha = 0.45;
        chart.fill();
        chart.stroke();
    }
}

function checkArea(x, y, r) {
    return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r);
}

function checkRectangle(x, y, r) {
    return x <= 0 && y <= 0 && Number(x) >= Number(-r) / 2 && Number(y) >= Number(-r);
}

function checkTriangle(x, y, r) {
    return x >= 0 && y >= 0 && Number(x) + Number(y) <= r;
}

function checkCircle(x, y, r) {
    return x >= 0 && y <= 0 && Number(x) * Number(x) + Number(y) * Number(y) <= (Number(r) / 2) * (Number(r) / 2);
}