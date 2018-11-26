import React from "react";
import Messages from "./Messages.jsx";
import UserInfo from "./UserInfo.jsx";

class User extends React.Component {
    render() {
        console.log("Rendering user component");
        return (
            <div className="flex-col align-center">
                <UserInfo 
                    name={this.props.user.name} 
                    email={this.props.user.email}
                    bio={this.props.user.bio}
                    />
                <Messages messages={this.props.messages} />
            </div>
        )
    }
}

export default User;
