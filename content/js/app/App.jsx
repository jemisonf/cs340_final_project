import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            bearerToken: "abcdefg",
        }
    }

    render() {
        return (
                <BrowserRouter>
                    <div id="main">
                        <Header currentUser={this.state.currentUser} />
                        <Main currentUser={this.state.currentUser} />
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
