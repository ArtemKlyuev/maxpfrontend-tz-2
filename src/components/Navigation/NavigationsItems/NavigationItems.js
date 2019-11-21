import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <nav className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            Главная
        </NavigationItem>
        {!props.isAuth ? (
            <NavigationItem link="/login">Войти</NavigationItem>
        ) : (
            <NavigationItem link="/logout">Выйти</NavigationItem>
        )}

        <NavigationItem link="/news">Новости</NavigationItem>
        {props.isAuth && (
            <NavigationItem link="/profile">Профиль</NavigationItem>
        )}
    </nav>
);

export default navigationItems;
