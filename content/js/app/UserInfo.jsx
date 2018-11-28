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
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
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

    follow() {
        fetch(`http://52.12.175.219/follows`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                follower_id: this.props.currentUser,
                following_id: this.props.id
            })
        })
            .then(res => res.json())
            .then(json => this.getFollowers())
    }

    unfollow() {
        fetch(`http://52.12.175.219/follows?follower_id=${this.props.currentUser}&following_id=${this.props.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.props.bearerToken}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => this.getFollowers())

    }

    render() {
        return (
            <div className="box box-shadow flex-col align-center">
                <div className="flex-row space-around align-center">
                    <h2 className="flex align-center justify-start">{this.props.name}</h2>
                    <a className="flex align-center justify-end" href={`mailto:${this.props.email}`}>{this.props.email}</a>
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
                    {this.state.followers.filter(follower => follower.id == this.props.currentUser).length == 0 ? <button onClick={this.follow} className="btn btn-success">Follow</button> : <button onClick={this.unfollow} className="btn btn-success-o">Unfollow</button>}
                </div>
            </div>
        )
    }
}

export default UserInfo;
