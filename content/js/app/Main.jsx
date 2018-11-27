import React from "react";
import { Route, Switch} from "react-router-dom";
import AsyncFeed from "./AsyncFeed.jsx";
import AsyncFullMessage from "./AsyncFullMessage.jsx";
import AsyncUser from "./AsyncUser.jsx";
import EditMessage from "./EditMessage.jsx";
import AsyncEditMessage from "./AsyncEditMessage.jsx";

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
                    <Route exact path="/messages/:id" render={
                        (props) => (
                            <AsyncFullMessage currentUser={this.props.currentUser} bearerToken={this.props.bearerToken} {...props} />
                        )
                    }/>
                    <Route exact path="/messages/:id/edit" render={
                        (props) => (
                            <AsyncEditMessage currentUser={this.props.currentUser} bearerToken={this.props.bearerToken} {...props} />
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
