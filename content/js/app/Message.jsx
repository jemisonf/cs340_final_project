import {Link} from "react-router-dom";
import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className="flex-col box box-shadow space-between">
                <div className="flex-row message-text">
                    <p>{this.props.text}</p>
                </div>
                { this.props.currentUser == this.props.authorId ? <div className="flex-row justify-start"><Link to={`/messages/${this.props.id}/edit`}>Edit</Link></div> : "" }
                <div className="flex-row space-between message-details">
                    <Link to={`/messages/${this.props.id}`}>View Full Comments</Link>
                    <Link to={`/user/${this.props.authorId}`}>{this.props.author}</Link>
                </div>
            </div>
        )
    }
}

export default Message;
