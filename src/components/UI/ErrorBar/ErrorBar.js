import React from 'react';
import classes from './ErrorBar.module.css';

class ErrorBar extends React.Component {
    componentDidMount() {
        console.log('[ERROR BAR CDM]');
    }

    componentDidUpdate() {
        console.log('[ERROR BAR CDU]');
    }

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
