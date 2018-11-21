import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    render() {
        return (
            <div id="main">
                <Header />
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
