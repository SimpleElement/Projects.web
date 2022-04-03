new Vue({
    el: ".app",

    methods: {
        logInClick() {
            if (this.usernameAuth === "") {
                this.message = "Fill in the field username";
                return;
            }

            if (this.passwordAuth === "") {
                this.message = "Fill in the field password";
                return;
            }

            postData('/WebLab4/api/users/auth', {
                username: this.usernameAuth,
                password: this.passwordAuth,
            }).then(response => response.json())
                .then(res => this.resultAuth(res));
        },
        registrationClick() {

            let location = window.location.hostname + ":" + window.location.port;

            window.location.href = "http://" + location + "/WebLab4" + "/reg.html";
        },
        resultAuth(response) {
            if (response.status === 200) {
                sessionStorage.setItem("username", this.usernameAuth);
                sessionStorage.setItem("password", this.passwordAuth);

                window.location.href = "http://" + window.location.hostname + ":" + window.location.port + "/WebLab4" + "/index.html";
            } else {
                this.message = response.message;
            }
        }
    },

    data() {
        return {
            message: "",
            usernameAuth: "",
            passwordAuth: ""
        }
    }

})

async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
    })
}