import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputEl = null;
    const inputClasses = [classes.Input_General];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputClasses.push(classes.Input);

            inputEl = (
                <input
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    placeholder={props.placeholder}
                    type={props.type}
                    required={props.required}
                />
            );
            break;
        case 'textarea':
            inputEl = <input />;
            break;
        default:
            inputEl = <input />;
    }

    const label = (
        <label htmlFor={inputEl} className={classes.Input_General}>
            {props.label}
        </label>
    );

    return (
        <div className={classes.Input_General}>
            {props.label && label}
            {inputEl}
        </div>
    );
};

export default input;
