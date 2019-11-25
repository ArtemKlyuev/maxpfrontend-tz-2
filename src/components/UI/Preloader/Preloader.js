import React from 'react';
import classes from './Predloader.module.css';

const preloader = (props) => (
    <div style={{ textAlign: 'center' }}>
        <svg
            className={classes.Spinner}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className={classes.path}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
            ></circle>
        </svg>
    </div>
);

export default preloader;
