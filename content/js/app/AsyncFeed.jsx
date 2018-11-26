import React from "react";
import Messages from "./Messages.jsx";

class AsyncFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contentLoaded: false,
            content: {},
        };
    }

    logResponse() {
        console.log(this.reponseText);
    }
    componentDidMount() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.logResponse);
        oReq.open("GET", "http://52.12.175.219/users/21/feed");
        oReq.send();
    }
    render() {
        if (this.state.contentLoaded) {
            return this.state.content;
        } else {
            return(
                <p>Loading . . .</p>
            )
        }
    }
}

export default AsyncFeed;
