import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className="flex-col box box-shadow space-between">
                <div className="flex-row message-text">
                    <p>{this.props.text}</p>
                </div>
                <div className="flex-row justify-start message-details">
                    <a href="#">{this.props.authorName}</a>
                </div>
            </div>
        )
    }
}

export default Message;
