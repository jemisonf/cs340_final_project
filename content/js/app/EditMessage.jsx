import React from "react"

class EditMessage extends React.Component {
    render() {
        return (
            <div className="box box-shadow flex-col">
                <textarea id="submit-message" rows={10} defaultValue={this.props.text} />
                <div className="flex-row justify-center">
                    <button className="btn btn-success" onClick={this.props.submitFunction}>Update</button>
                    <button className="btn btn-danger" onClick={this.props.deleteFunction}>Delete</button>
                </div>
            </div>
        )
    }
}

export default EditMessage;
