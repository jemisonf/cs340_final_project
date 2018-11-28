import React from "react"
import Message from "./Message.jsx"

class Messages extends React.Component {
    render() {
        console.log(this.props.messages);
        return (
            <div className="content flex-col justify-center align-center">
                {
                    this.props.messages.map(message => (
                        <Message text={message.text}
                                 author={message.author}
                                 authorId={message.authorId}
                                 id={message.id}
                                 key={message.id}
                                 currentUser={this.props.currentUser}
                        />
                    ))
                }
            </div>
        )
    }
}

Messages.defaultProps = {
    messages: []
}

export default Messages;
