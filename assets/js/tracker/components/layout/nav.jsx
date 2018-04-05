import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { NavItem } from 'reactstrap';
import {connect} from "react-redux";
import {TokenActionTypes} from "../../../store";

let Session = (props) => {
    return [
        <span className="navbar-text mr-1" key={'user-name'}>
        { props.token ? props.token.tokenWrapper.user.name : ''} |</span>,
        <NavItem key={'logout-button'}>
            <div className={'navbar-text'} onClick={ () => handleLogOut(props)}>Log out</div>
        </NavItem>];
};

function handleLogOut(props) {
    console.log(props);
    props.dispatch({
        type: TokenActionTypes.RemoveToken
    });
    localStorage.removeItem('__AUTH');
    props.history.push('/login');
}

const Nav = (props) => {
    console.log(props);
    let sessionInfo;

    if (props.token) {
        sessionInfo = <Session token={props.token} history={props.history} dispatch={props.dispatch}/>
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
                    <NavLink to="/tasks" href="#" className="nav-link">Tasks</NavLink>
                </NavItem>

            </ul>
            <ul className="navbar-nav">
                {sessionInfo}
            </ul>
        </nav>
    );
};

function state2props(state) {
    console.log(state);
    return {
        token: state.token,
    };
}

export default withRouter(connect(state2props)(Nav));