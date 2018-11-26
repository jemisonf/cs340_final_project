import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Comment from "./Comment.jsx";

class FullMessage extends React.Component {
    render() {
        return(
            <div className="box-shadow frame">
                <div className="box-inner">
                    <div className="flex-row message-text">
                        <p>{this.props.text}</p>
                    </div>
                    <div className="flex-row justify-start message-details">
                        <Link to={`/user/${this.props.authorId}`}>{this.props.author}</Link>
                    </div>
                </div>
                <div className="comments flex-col">
                    {this.props.comments.map(comment => (
                       <Comment key={comment.text} text={comment.text} author={comment.author} authorId={comment.authorId} /> 
                    ))}
                </div>
            </div>
        )
    }
}

FullMessage.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string,
    authorId: PropTypes.number,
    comments: PropTypes.array
}
FullMessage.defaultProps = {
    text: "",
    author: "",
    authorId: 0,
    comments: []
}
export default FullMessage;
