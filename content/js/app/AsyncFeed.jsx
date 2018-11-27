import React from "react";
import Messages from "./Messages.jsx";

class AsyncFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contentLoaded: false,
            content: {},
        };
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

    updateContent(json) {
        console.log(json);
        let messages = json.map((element) => (
            {id: element.id, text: element.message, authorId: element.poster, author: this.getAuthorName(element.poster)}
        ))
        this.setState({
            content: <Messages messages={messages} />,
            contentLoaded: true,
        })
    }

    useBlankContent() {
        console.log(blankContent);
        this.setState({
            content: (<p>You aren't following anyone :(</p>),
            contentLoaded: true,
        })
    }
    componentDidMount() {
        var myHeaders = new Headers();
        console.log(this.props.bearerToken);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", `Bearer ${this.props.bearerToken}`);
        fetch(`http://52.12.175.219/users/${this.props.userId}/feed`,
        {
            mode: "cors",
            method: "GET",
            headers: myHeaders, 
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((myJson) => {
                this.updateContent(myJson);
            })
            .catch((error) => {
                this.useBlankContent();
            })
    }
    render() {
        console.log(this.props.bearerToken);
        console.log(this.props);
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
