import React from "react";
import Messages from "./Messages.jsx";
import UserInfo from "./UserInfo.jsx";

class User extends React.Component {
    render() {
        console.log("Rendering user component");
        return (
            <div className="flex-col align-center">
                <UserInfo />
                <Messages />
            </div>
        )
    }
}

export default User;
