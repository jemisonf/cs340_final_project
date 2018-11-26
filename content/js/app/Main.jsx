import React from "react";
import { Route, Switch} from "react-router-dom";
import Messages from "./Messages.jsx";
import User from "./User.jsx";
import FullMessage from "./FullMessage.jsx";
import AsyncFeed from "./AsyncFeed.jsx";

class Main extends React.Component {
    render() {
        return (
            <div className="flex-col align-center">
                <Switch>
                    <Route exact path="/" render={
                        (props) => (
                            <AsyncFeed />
                        )
                    }/>
                    <Route path="/messages/:id" render={
                        (props) => (
                            <FullMessage 
                                text="test hahaha" 
                                author="Fischer Jemison" 
                                authorId={1} 
                                comments={[{text: "this is a test", author: "Fischer Jemison", authorId: 1}]} 
                            />
                        )
                    }/>
                    <Route path="/user/:id" render={
                        (props) => (
                            <User
                                user={
                                    {
                                        name: "Fischer Jemison",
                                        email: "jemisonf@oregonstate.edu",
                                        bio: "This is a test",
                                        id: 1
                                    }
                                }

                                messages={
                                    [
                                        {
                                            text: "This is a test",
                                            author: "Fischer Jemison",
                                            authorId: 1,
                                            id: 1,
                                        }
                                    ]
                                }
                            />
                        )    
                    }/>
                </Switch>
            </div>
        )
    }
}

export default Main
