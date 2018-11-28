import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import LoginForm from "./LoginForm.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 0,
            bearerToken: "",
            userLoggedIn: false,
        }
        this.setCreds = this.setCreds.bind(this);
    }

    setCreds(email, bearerToken) {
        console.log(bearerToken);
        fetch(`http://52.12.175.219/users?email=${email}`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                console.log(json.id);
                this.setState({
                    currentUser: json[0].id,
                    bearerToken: bearerToken,
                    userLoggedIn: true,
                })
            })
    }

    render() {
        if (this.state.userLoggedIn) {
            console.log(this.state.bearerToken);
            console.log(this.state.currentUser);
            return (
                    <BrowserRouter>
                        <div id="main">
                            <Header currentUser={this.state.currentUser} bearerToken={this.state.bearerToken} />
                            <Main currentUser={this.state.currentUser} bearerToken={this.state.bearerToken} />
                        </div>
                    </BrowserRouter>
            );
        } else {
            return (
                <LoginForm setCreds={this.setCreds} />
            )
        }
    }
}

export default App;
