window.onload = function () {
    setScreenResolution();
}

window.addEventListener('resize', function (event) {
    setScreenResolution();
});

var buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", function () {
    document.getElementById("output").innerHTML = "";
    let data = document.getElementById("file").files;

    if (data.length != 1) {
        document.getElementById("output").innerHTML = "No file or many files";
        document.getElementById("output").style.color = "red";
        return;
    }

    if (getFormat(data) != "csv") {
        document.getElementById("output").innerHTML = "Invalid file format";
        document.getElementById("output").style.color = "red";
        return;
    }

    let request = new XMLHttpRequest();
    let location = window.location.hostname + ":" + window.location.port;

    function reqReadyStateChange() {
        if (request.readyState == 4) {
            let status = request.status;
            if (status == 200) {
                document.getElementById("output").innerHTML = "";
                document.getElementById("output").style.color = "green";
                let data = request.responseText;
                let blob = new Blob([data], {type: "text/plain"});
                let link = document.createElement("a");
                link.setAttribute("href", URL.createObjectURL(blob));
                link.setAttribute("download", "report.csv");
                link.click();
                document.getElementById("output").innerHTML = "Success";
            }
            if (status == 400) {
                document.getElementById("output").innerHTML = request.responseText;
                document.getElementById("output").style.color = "red";
            }
        }
    }

    let formData = new FormData();
    formData.append("file", data[0]);

    let type = "updateElements";
    let body = "type=" + type;

    request.open("POST", "http://" + location + "/PHPproject/php/controller.php?" + body);
    request.onreadystatechange = reqReadyStateChange;
    request.send(formData);
});

function getFormat(file) {
    return file[0].name.split('.').pop();
}

function setScreenResolution() {
    let sizeIndent = (window.innerWidth - 400) / 2;

    document.querySelector('header').style.left = sizeIndent + "px";
    document.querySelector('main').style.left = sizeIndent + "px";
}