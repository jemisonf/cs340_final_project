import {Link} from "react-router-dom";
import React from "react";

class Comment extends React.Component {
    render() {
        return (
            <div className="comment flex-col">
                <p>{this.props.text}</p>
                <Link to={`/user/${this.props.authorId}`}>{this.props.author}</Link>
            </div>
        )
    }
}

export default Comment;
