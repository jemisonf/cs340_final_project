import React from "react";

class UserInfo extends React.Component {
    render() {
        return (
            <div className="box box-shadow flex-col align-center">
                <div className="flex-row space-around align-center">
                    <h2 className="flex align-center justify-start">Fischer Jemison</h2>
                    <a className="flex-row align-center justify-end" href="mailto:jemisonf@oregonstate.edu">jemisonf@oregonstate.edu</a>
                </div>
                <div className="flex-row space-around">
                    <p>Just a small town boy, living in a lonely world</p>
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
