import {Link} from "react-router-dom"
import React from "react"

class Header extends React.Component {
    render() {
        return (
            <div className="nav box-shadow">
                <h1>msgr</h1>
                <Link to="/">Home</Link>
                <Link to={`/user/${this.props.currentUser}`}>My Profile</Link>
            </div>
        )
    }
}

export default Header
