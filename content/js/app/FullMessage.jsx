import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Comment from "./Comment.jsx";
import SubmitComment from "./SubmitComment.jsx";

class FullMessage extends React.Component {
    constructor(props) {
        super(props);
        this.submitCommentAndRedraw = this.submitCommentAndRedraw.bind(this);
    }

    submitCommentAndRedraw() {
        console.log("Submitting comment and redrawing . . .");
        console.log(document.querySelector("#comment-submit").value)
        fetch(`http://52.12.175.219/comments`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "msg_id": this.props.id,
                "commenter_id": this.props.currentUser,
                "message": document.querySelector("#comment-submit").value
            })
        })
            .then(response => response.json())
            .then(json => this.props.redrawComments())
    }

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
                       <Comment key={comment.id} text={comment.text} author={comment.author} authorId={comment.authorId} /> 
                    ))}
                    <SubmitComment submitComment={this.submitCommentAndRedraw} />
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
