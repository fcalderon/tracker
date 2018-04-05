import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import {connect} from "react-redux";

let Session = connect(({token}) => {return {token};})((props) => {
    return <div className="navbar-text">
        User Name = { props.token.tokenWrapper.user.name }
    </div>;
});

const Nav = (props) => {
    let sessionInfo;

    if (props.token) {
        sessionInfo = <Session token={props.token}/>
    } else {
        sessionInfo = [
            <NavItem key={'login-nav-item'}>
                <NavLink to="/login" href="#" className="nav-link">Login</NavLink>
            </NavItem>,
            <NavItem key={'sign-up-nav-item'}>
                <NavLink to="/signUp" href="#" className="nav-link">Sign Up</NavLink>
            </NavItem>
        ]
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
            <ul className="navbar-nav mr-auto">
                <NavItem>
                    <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/tasks" href="#" className="nav-link">My Tasks</NavLink>
                </NavItem>
                {sessionInfo}
            </ul>
        </nav>
    );
};

function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Nav);