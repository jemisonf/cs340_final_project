import React from "react";
import Messages from "./Messages.jsx";
import SubmitMessage from "./SubmitMessage.jsx";

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.submitMessageAndRedraw = this.submitMessageAndRedraw.bind(this);
    }

    submitMessageAndRedraw() {
        console.log(document.querySelector("#submit-message").value);
        console.log(this.props.currentUser);
        fetch(`http://52.12.175.219/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "poster": this.props.currentUser,
                "message": document.querySelector("#submit-message").value
            })
        })
            .then(response => response.json())
            .then(json => this.props.redrawFeed())
    }

    render() {
        return (
            <div>
                <SubmitMessage submitFunction={this.submitMessageAndRedraw} /> 
                <Messages messages={this.props.messages} currentUser={this.props.currentUser} />
            </div>
        )
    }
}

export default Feed;
