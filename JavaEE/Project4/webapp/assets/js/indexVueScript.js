new Vue({
    el: ".app",

    created: function () {
        getData('/WebLab4/api/points/get', {
        }).then(result => result.json())
            .then(points => this.userPoints = points);
    },

    methods: {
        xButtonClick(event) {
            this.xBorderColor = "color: black"
            this.xVal = event.target.value;
            this.x1ButtonColor = "";
            this.x2ButtonColor = "";
            this.x3ButtonColor = "";
            this.x4ButtonColor = "";
            this.x5ButtonColor = "";
            this.x6ButtonColor = "";
            this.x7ButtonColor = "";
            this.x8ButtonColor = "";
            this.x9ButtonColor = "";
            if (event.target.id === "x1")
                this.x1ButtonColor = "border: 3px solid green";
            if (event.target.id === "x2")
                this.x2ButtonColor = "border: 3px solid green";
            if (event.target.id === "x3")
                this.x3ButtonColor = "border: 3px solid green";
            if (event.target.id === "x4")
                this.x4ButtonColor = "border: 3px solid green";
            if (event.target.id === "x5")
                this.x5ButtonColor = "border: 3px solid green";
            if (event.target.id === "x6")
                this.x6ButtonColor = "border: 3px solid green";
            if (event.target.id === "x7")
                this.x7ButtonColor = "border: 3px solid green";
            if (event.target.id === "x8")
                this.x8ButtonColor = "border: 3px solid green";
            if (event.target.id === "x9")
                this.x9ButtonColor = "border: 3px solid green";
        },

        yInputKeyUp() {
            if (validationY(this.yVal)) {
                this.yBorderColor = "color: black";
            } else {
                if (this.yVal === "") {
                    this.yBorderColor = "color: black";
                } else {
                    this.yBorderColor = "color: red";
                }
            }
        },

        rButtonClick() {
            this.rBorderColor = "color: black";
            this.rVal = event.target.value;
            this.r1ButtonColor = "border:";
            this.r2ButtonColor = "border:";
            this.r3ButtonColor = "border:";
            this.r4ButtonColor = "";
            this.r5ButtonColor = "";
            this.r6ButtonColor = "";
            this.r7ButtonColor = "";
            this.r8ButtonColor = "";
            this.r9ButtonColor = "";
            if (event.target.id === "r1")
                this.r1ButtonColor = "border: 3px solid green";
            if (event.target.id === "r2")
                this.r2ButtonColor = "border: 3px solid green";
            if (event.target.id === "r3")
                this.r3ButtonColor = "border: 3px solid green";
            if (event.target.id === "r4")
                this.r4ButtonColor = "border: 3px solid green";
            if (event.target.id === "r5")
                this.r5ButtonColor = "border: 3px solid green";
            if (event.target.id === "r6")
                this.r6ButtonColor = "border: 3px solid green";
            if (event.target.id === "r7")
                this.r7ButtonColor = "border: 3px solid green";
            if (event.target.id === "r8")
                this.r8ButtonColor = "border: 3px solid green";
            if (event.target.id === "r9")
                this.r9ButtonColor = "border: 3px solid green";
            if (this.rVal < 0) {
                r = -1 * this.rVal;

                this.rectangle = 225 + "," + (225 + 25 * r) + " " + 225 + "," + 225 + " " + (225 - 50 * r) + "," + 225 + " " + (225 - 50 * r) + "," + (225 + 25 * r);
                this.triangle = 225 + "," + 225 + " " + (225 - 25 * r) + "," + 225 + " " + 225 + "," + (225 - 25 * r);
                this.semicircle = "M" + (225 + 25 * r) + "," + 225 + " A" + (25 * r) + "," + (25 * r) + " " + 90 + " " + 0 + "," + 0 + " " + 225 + "," + (225 - 25 * r) + " L " + 225 + "," + 225 + " Z";
            } else {
                this.rectangle = 225 + "," + (225 + 25 * this.rVal) + " " + 225 + "," + 225 + " " + (225 + 50 * this.rVal) + "," + 225 + " " + (225 + 50 * this.rVal) + "," + (225 + 25 * this.rVal);
                this.triangle = 225 + "," + 225 + " " + (225 + 25 * this.rVal) + "," + 225 + " " + 225 + "," + (225 - 25 * this.rVal);
                this.semicircle = "M" + (225 - 25 * this.rVal) + "," + 225 + " A" + (25 * this.rVal) + "," + (25 * this.rVal) + " " + 90 + " " + 0 + "," + 1 + " " + 225 + "," + (225 - 25 * this.rVal) + " L " + 225 + "," + 225 + " Z";
            }
        },

        submitClick() {
            if (validationX(this.xVal) && validationY(this.yVal) && validationR(this.rVal)) {
                postData('/WebLab4/api/points/add', {
                    x: String(this.xVal),
                    y: String(this.yVal),
                    r: String(this.rVal),
                }).then(result => result.json())
                    .then(point => this.userPoints.push(point));

            } else {
                if (!validationX(this.xVal)) {
                    this.xBorderColor = "color: red";
                }
                if (!validationY(this.yVal)) {
                    this.yBorderColor = "color: red";
                }
                if (!validationR(this.rVal)) {
                    this.rBorderColor = "color: red";
                }
            }
        },

        clearClick() {
            postData('/WebLab4/api/points/clear', {}).then(this.userPoints = [])
        },

        exitClick() {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("password");

            window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/WebLab4" + "/auth.html";
        },

        graphClick() {
            if (validationR(this.rVal)) {
                let xClick = (event.layerX - 225) / 50;
                let yClick = (225 - event.layerY) / 50;

                postData('/WebLab4/api/points/add', {
                    x: String(xClick),
                    y: String(yClick),
                    r: String(this.rVal),
                }).then(result => result.json())
                    .then(point => this.userPoints.push(point));
            } else {
                this.xBorderColor = "color: black";
                this.yBorderColor = "color: black";
                this.rBorderColor = "color: red";
            }
        },

    },

    data() {
        return {
            xVal: "",
            yVal: "",
            rVal: "",
            rectangle: "",
            triangle: "",
            semicircle: "",
            xBorderColor: "color: black",
            yBorderColor: "color: black",
            rBorderColor: "color: black",
            x1ButtonColor: "",
            x2ButtonColor: "",
            x3ButtonColor: "",
            x4ButtonColor: "",
            x5ButtonColor: "",
            x6ButtonColor: "",
            x7ButtonColor: "",
            x8ButtonColor: "",
            x9ButtonColor: "",
            r1ButtonColor: "",
            r2ButtonColor: "",
            r3ButtonColor: "",
            r4ButtonColor: "",
            r5ButtonColor: "",
            r6ButtonColor: "",
            r7ButtonColor: "",
            r8ButtonColor: "",
            r9ButtonColor: "",
            userPoints: []
        }
    }
});
