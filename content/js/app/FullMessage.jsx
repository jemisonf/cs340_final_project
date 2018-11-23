import React from "react";

class FullMessage extends React.Component {
    render() {
        return(
            <div class="box-shadow frame">
                <div className="box-inner">
                    <div className="flex-row message-text">
                        <p>Test test hahaha</p>
                    </div>
                    <div className="flex-row justify-start message-details">
                        <a href="#">Fischer Jemison</a>
                    </div>
                </div>
                <div className="comments flex-col">
                    <div className="comment flex-col">
                        <p>This is a comment</p>
                        <a href="#">Fischer Jemison</a>
                    </div>
                    <div className="comment flex-col">
                        <p>This is a comment</p>
                        <a href="#">Fischer Jemison</a>
                    </div>
                    <div className="comment flex-col">
                        <p>This is a comment</p>
                        <a href="#">Fischer Jemison</a>
                    </div>
                    <div className="comment flex-col">
                        <p>This is a comment</p>
                        <a href="#">Fischer Jemison</a>
                    </div>
                    <div className="comment flex-col">
                        <p>This is a comment</p>
                        <a href="#">Fischer Jemison</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default FullMessage;
