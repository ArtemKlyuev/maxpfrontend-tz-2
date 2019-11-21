import React from 'react';
import NavigationItems from '../NavigationsItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <NavigationItems isAuth={props.isAuth} />
        </div>
    );
};

export default sideDrawer;
