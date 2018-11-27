import React from "react";
import {Link} from "react-router-dom";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            following: [], 
            activeFollowersOrFollowingItem: ""
        }
        this.showFollowers = this.showFollowers.bind(this);
        this.showFollowing = this.showFollowing.bind(this);
    }

    componentDidMount() {
        this.getFollowing();
        this.getFollowers();
    }

    getFollowing() {
        console.log("getting following . . ");
        fetch(`http://52.12.175.219/users/${this.props.id}/following`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    following: json,
                })
            })
    }

    getFollowers() {
        console.log("getting followers . . ");
        fetch(`http://52.12.175.219/users/${this.props.id}/followers`, {
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`
            }
        })
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    followers: json,
                })
            })
    }

    showFollowers() {
        let followerElement = (
            <div className="box flex-col align-center">
                {this.state.followers.map(follower => (
                    <Link key={follower.id} to={`/user/${follower.id}`}>{follower.name}</Link>
                ))}
            </div>
        );
        this.setState({
            activeFollowersOrFollowingItem: followerElement,
        })
    }

    showFollowing() {
        console.log(this.state.following);
        let followingElement = (
            <div className="box flex-col align-center">
                {this.state.following.map(following => (
                    <Link key={following.id} to={`/user/${following.id}`}>
                        {following.name}
                    </Link>
                ))}
            </div>
        );
        this.setState({
            activeFollowersOrFollowingItem: followingElement,
        })
    }

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
                    <a onClick={this.showFollowers}>{this.state.followers.length} Followers</a>
                    <a onClick={this.showFollowing}>{this.state.following.length} Following</a>
                </div>
                { this.state.activeFollowersOrFollowingItem }
                <div className="flex-row space-around">
                    <button className="btn-success">Follow</button>
                </div>
            </div>
        )
    }
}

export default UserInfo;
