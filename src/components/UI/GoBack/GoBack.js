import React from 'react';
import Arrow from '../Arrow/Arrow';
import classes from './GoBack.module.css';

const goBack = (props) => (
    <div onClick={props.history.goBack} className={classes.GoBack}>
        <Arrow direction={'left'} />
        Назад
    </div>
);

export default goBack;
