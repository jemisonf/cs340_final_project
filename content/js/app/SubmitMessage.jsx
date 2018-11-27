import React from "react";

class SubmitMessage extends React.Component {
    render() {
        return (
            <div className="box box-shadow flex-col align-center">
                <textarea id="submit-message" rows={10} />
                <button className="btn btn-success" onClick={this.props.submitFunction}>Submit</button>
            </div>
        )
    }
}

export default SubmitMessage;
