import React from "react";

class UserInfo extends React.Component {
    render() {
        return (
            <div className="box box-shadow flex-col align-center">
                <div className="flex-row space-around align-center">
                    <h2 className="flex align-center justify-start">{this.props.name}</h2>
                    <a className="flex-row align-center justify-end" href={`mailto:${this.props.email}`}>{this.props.email}</a>
                </div>
                <div className="flex-row space-around">
                    <p>{this.props.bio}</p>
                </div>
                <div className="flex-row space-around">
                    <a href="#">121 Followers</a>
                    <a href="#">121 Followers</a>
                </div>
                <div className="flex-row space-around">
                    <button className="btn-success">Follow</button>
                </div>
            </div>
        )
    }
}

export default UserInfo;
