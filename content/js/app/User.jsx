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
                    id={this.props.user.id}
                    bearerToken={this.props.bearerToken}
                    currentUser={this.props.currentUser}
                    />
                <Messages messages={this.props.messages} currentUser={this.props.currentUser} />
            </div>
        )
    }
}

export default User;
