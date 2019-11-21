import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <NavLink
        to={props.link}
        exact={props.exact}
        className={classes.NavigationItem}
        activeClassName={classes.active}
    >
        {props.children}
    </NavLink>
);

export default navigationItem;
