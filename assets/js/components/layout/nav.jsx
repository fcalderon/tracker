import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export const Nav = (props) => {
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
            </ul>
        </nav>
    );
};