import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit() {
        fetch("http://52.12.175.219/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: document.querySelector("#username").value,
                password: document.querySelector("#password").value
            })
        })
        .then(response => response.json())
        .then(json => {
            this.props.setCreds(21, json.token);
        })
        .catch(error => console.log(error));
    }
    render() {
        return (
            <div className="full-screen flex-col justify-center align-center">
                <div className="login-form flex-col box box-shadow">
                    <label htmlFor="username">User Name</label>
                    <input id="username" type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" />
                    <button className="btn btn-success" onClick={this.submit}>Submit</button>
                </div>
            </div>
        )
    }
}

export default LoginForm;
