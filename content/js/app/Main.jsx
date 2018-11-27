import React from "react";
import { Route, Switch} from "react-router-dom";
import Messages from "./Messages.jsx";
import User from "./User.jsx";
import FullMessage from "./FullMessage.jsx";
import AsyncFeed from "./AsyncFeed.jsx";
import AsyncFullMessage from "./AsyncFullMessage.jsx";
import AsyncUser from "./AsyncUser.jsx";

class Main extends React.Component {
    render() {
        return (
            <div className="flex-col align-center">
                <Switch>
                    <Route exact path="/" render={
                        (props) => (
                            <AsyncFeed userId={21}/>
                        )
                    }/>
                    <Route path="/messages/:id" component={AsyncFullMessage} />
                    <Route path="/user/:id" component={AsyncUser} />
                </Switch>
            </div>
        )
    }
}

export default Main
