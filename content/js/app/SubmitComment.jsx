import React from "react";

class SubmitComment extends React.Component {
    render() {
        return (
            <div className="comment flex-col">
                <input id="comment-submit" type="text" />
                <button onClick={this.props.submitComment} className="btn btn-success">Submit</button>
            </div>
        )
    }
}

export default SubmitComment;
