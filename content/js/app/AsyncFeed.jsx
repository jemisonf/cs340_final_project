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

    updateContent(json) {
        console.log(json);
        let messages = json.map((element) => (
            {id: element.id, text: element.message, authorId: element.poster, author: "Fischer Jemison"}
        ))
        this.setState({
            content: <Messages messages={messages} />,
            contentLoaded: true,
        })
    }
    componentDidMount() {
        fetch("http://52.12.175.219/users/21/feed")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.updateContent(myJson);
            })
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
