import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    render() {
        return (
                <BrowserRouter>
                    <div id="main">
                        <Header />
                        <Main />
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
