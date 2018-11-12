import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";

class App extends React.Component {
    render() {
        return (
            <div id="main">
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
