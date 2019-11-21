import React from 'react';
import classes from './Arrow.module.css';

const arrow = (props) => {
    const { color, direction } = props;
    const defaultColor = '#3dabca';

    let rotate = '';

    switch (direction) {
        case 'left':
            rotate = classes.left;
            break;
        case 'down':
            rotate = classes.down;
            break;
        case 'up':
            rotate = classes.up;
            break;
        default:
            break;
    }

    return (
        <svg
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4.53657 8.69699"
            className={rotate}
        >
            <path
                d="
        M.18254,8.697a.18149.18149,0,0,1-.12886-.31034L4.09723,4.34126.05369.29954a.18149.18149,
        0,0,1,.2559-.2559L4.4838,4.21785a.18149.18149,0,0,1,0,.2559L.30958,8.648A.18149.18149,
        0,0,1,.18254,8.697Z
      "
                fill={color || defaultColor}
            ></path>
        </svg>
    );
};

export default arrow;
