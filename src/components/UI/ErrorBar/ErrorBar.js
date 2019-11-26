import React from 'react';
import classes from './ErrorBar.module.css';

class ErrorBar extends React.Component {
    render() {
        const { show, children } = this.props;
        let errorClasses = [classes.ErrorBar];

        if (show) {
            errorClasses.push(classes.show);
        }
        return <div className={errorClasses.join(' ')}>{children}</div>;
    }
}

export default ErrorBar;
