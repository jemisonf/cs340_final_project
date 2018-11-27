import React from "react";
import { withRouter } from 'react-router';
import EditMessage from "./EditMessage.jsx";

class AsyncEditMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            content: {}
        }
        this.updateMessage = this.updateMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    updateMessage() {
        fetch(`http://52.12.175.219/messages/${this.props.match.params.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "message": document.querySelector("#submit-message").value 
            })
        })
        .then(res => res.json())
        .then(json => {
            this.props.history.push(`/messages/${this.props.match.params.id}`);
        })
    }

    deleteMessage() {
        fetch(`http://52.12.175.219/messages/${this.props.match.params.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
            },
        })
        .then(res => {
            this.props.history.push("/");
        })
        
    }


    updateContent(json) {
        this.setState({
            content: <EditMessage text={json.message} submitFunction={this.updateMessage} deleteFunction={this.deleteMessage} />,
            contentLoaded: true
        })
    }

    fetchContent() {
        fetch(`http://52.12.175.219/messages/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then(response => response.json())
            .then(json => {
                this.updateContent(json);
            })
    }

    componentDidMount() {
        console.log(this.props);
        this.fetchContent();
    }

    render() {
        if (this.state.contentLoaded) {
            return this.state.content;
        } else {
            return (<p>Loading . . .</p>)
        }
    }
}

export default withRouter(AsyncEditMessage);
