import React from "react";
import FullMessage from "./FullMessage.jsx";

class AsyncFullMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: false,
            content: {},
            message: {},
            messageLoaded: false,
            comments: {},
            commentsLoaded: false,
        }
        this.authorNames = {};
    }

    getAuthorName(author_id) {
        // return "Fischer Jemison"
        let author_name = "";
        if (author_id in this.authorNames) {
            return this.authorNames[author_id]
        } else {
            let res = new XMLHttpRequest();
            res.open('GET', `http://52.12.175.219/users/${author_id}`, false);
            res.setRequestHeader("Authorization", `Bearer ${this.props.bearerToken}`)
            res.send(null);
            author_name = JSON.parse(res.response).name;
            this.authorNames[author_id] = author_name;
            return author_name;
        }
    }

    setContent() {
        this.setState({
            contentLoaded: true,
            content: <FullMessage text={this.state.message.text} 
                                  author={this.state.message.author}
                                  authorId={this.state.message.authorId}
                                  comments={this.state.comments} />
        })
    }

    updateComments(json) {
        console.log(json);
        this.setState({
            comments: json.map(element => (
                {
                    text: element.message,
                    authorId: element.commenter_id,
                    author: this.getAuthorName(element.commenter_id),
                    id: element.id
                }
            )),
            commentsLoaded: true
        })
        if (this.state.messageLoaded) this.setContent();
    }

    updateMessage(json) {
        console.log(json);
        this.setState({
            message: {
                text: json.message,
                authorId: json.poster,
                author: this.getAuthorName(json.poster),
            },
            messageLoaded: true,
        })
        if (this.state.commentsLoaded) this.setContent()
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        fetch(`http://52.12.175.219/messages/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.updateMessage(json)
            })
            .catch(error => {console.log(error)});
        fetch(`http://52.12.175.219/comments?msg_id=${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.updateComments(json)
            })
            .catch(error => {console.log("comments error" + error)});
    }

    render() {
        if (this.state.contentLoaded) {
            return this.state.content;
        } else {
            return (<p>Loading . . .</p>)
        }
    }
}

export default AsyncFullMessage
