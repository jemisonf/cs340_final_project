import React from "react";
import User from "./User.jsx";

class AsyncUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            content: {},
            user: {},
            userLoaded: false,
            messages: {},
            messagesLoaded: false,
        };
    }

    updateUser(json) {
        console.log(json);
        this.setState({
            user: json,
            userLoaded: true,
        })
        if (this.state.messagesLoaded) this.setContent();
    }

    updateMessages(json) {
        console.log(json);
        this.setState({
            messages: json.sort((firstElement, secondElement) => new Date(secondElement.posted_date) - new Date(firstElement.posted_date)),
            messagesLoaded: true,
        })
        if (this.state.userLoaded) this.setContent();
    }

    setContent() {
        let messages = this.state.messages.map(element => (
            {id: element.id, text: element.message, authorId: element.poster, author: this.state.user.name}
        ));
        this.setState({
            content: <User user={this.state.user} messages={messages} bearerToken={this.props.bearerToken} currentUser={this.props.currentUser} />,
            contentLoaded: true,
        });
    }

    componentDidMount() {
        console.log(this.props.match);
        fetch(`http://52.12.175.219/users/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.updateUser(myJson);
            })
            .catch(error => {console.log(error)});
        fetch(`http://52.12.175.219/messages?poster=${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.updateMessages(myJson);
            })
            .catch(error => {console.log(error)});
    }

    render() {
        if (this.state.contentLoaded) {
            return this.state.content;
        } else {
            return ( <p>Loading . . .</p> ) 
        }
    }
}

export default AsyncUser;
