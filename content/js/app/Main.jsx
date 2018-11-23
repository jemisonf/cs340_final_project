import React from "react";
import { Route, Switch} from "react-router-dom";
import Messages from "./Messages.jsx";
import User from "./User.jsx";
import FullMessage from "./FullMessage.jsx";

class Main extends React.Component {
    render() {
        return (
            <div className="flex-col align-center">
                <Switch>
                    <Route exact path="/" component={Messages} />
                    <Route exact path="/message" component={FullMessage} />
                    <Route exact path="/user" component={User} />
                    <Route exact path="/user" component={User} />
                </Switch>
            </div>
        )
    }
}

export default Main
