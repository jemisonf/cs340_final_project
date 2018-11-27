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
        console.log(this.props.bearerToken);
        return (
            <div className="flex-col align-center">
                <Switch>
                    <Route exact path="/" render={
                        (props) => (
                            <AsyncFeed currentUser={this.props.currentUser} bearerToken={this.props.bearerToken} {...props}/>
                        )
                    }/>
                    <Route path="/messages/:id" render={
                        (props) => (
                            <AsyncFullMessage currentUser={this.props.currentUser} bearerToken={this.props.bearerToken} {...props} />
                        )
                    }/>
                    <Route path="/user/:id" render={
                        (props) => (
                            <AsyncUser currentUser={this.props.currentUser} bearerToken={this.props.bearerToken} {...props} />
                        )    
                    }/>
                </Switch>
            </div>
        )
    }
}

export default Main
