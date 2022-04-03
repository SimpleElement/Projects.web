new Vue({
    el: ".app",

    methods: {
        registerClick() {

            if (this.usernameReg === "") {
                this.message = "Fill in the field username";
                return;
            }

            if (this.password1Reg === "") {
                this.message = "Fill in the field password";
                return;
            }

            if (this.password2Reg === "") {
                this.message = "Fill in the field repeat password";
                return;
            }

            if (!(this.password1Reg === this.password2Reg)) {
                this.message = "Passwords do not match";
                return;
            }

            postData('/WebLab4/api/users/reg', {
                username: this.usernameReg,
                password: this.password1Reg,
            }).then(response => response.json())
                .then(res => this.resultReg(res));
        },
        authorizationClick() {
            window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/WebLab4" + "/auth.html";
        },
        resultReg(response) {
            if (response.status === 200) {
                sessionStorage.setItem("username", this.usernameReg);
                sessionStorage.setItem("password", this.password1Reg);

                window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/WebLab4" + "/index.html";
            } else {
                this.message = response.message;
            }
        }
    },

    data() {
        return {
            message: "",
            usernameReg: "",
            password1Reg: "",
            password2Reg: ""
        }
    }

})

async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
}