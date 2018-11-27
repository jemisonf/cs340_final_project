import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import LoginForm from "./LoginForm.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 21,
            bearerToken: "",
            userLoggedIn: false,
        }
        this.setCreds = this.setCreds.bind(this);
    }

    setCreds(userId, bearerToken) {
        console.log(bearerToken);
        this.setState({
            currentUser: userId,
            bearerToken: bearerToken,
            userLoggedIn: true,
        })
    }

    render() {
        if (this.state.userLoggedIn) {
            console.log(this.state.bearerToken);
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
