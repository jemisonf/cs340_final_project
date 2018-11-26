import {Link} from "react-router-dom"
import React from "react"

class Header extends React.Component {
    render() {
        return (
            <div className="nav box-shadow">
                <h1>msgr</h1>
                <Link to="/">Home</Link>
                <a href="#">My Profile</a>
            </div>
        )
    }
}

export default Header
