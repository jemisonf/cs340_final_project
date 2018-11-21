import React from "react";
import { Route, Switch} from "react-router-dom";
import Message from "./Message.jsx";
import Messages from "./Messages.jsx";

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Messages} />
                <Route exact path="/message" component={Message} />
            </Switch>
        )
    }
}

export default Main
