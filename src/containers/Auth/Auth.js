import React from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';
import axios from '../../shared/axiosInstance';
import * as actions from '../../redux/actions/auth';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Preloader from '../../components/UI/Preloader/Preloader';
import classes from './Auth.module.css';

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail адрес'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        }
    };

    componentDidMount() {
        this.props.onSetAuthRedirectPath('/profile');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            const { controls } = this.state;
            const updatedControls = updateObject(controls, {
                password: updateObject(controls.password, { value: '' })
            });

            this.setState({ controls: updatedControls });
        }
    }

    inputChangedHandler = (e, controlName) => {
        const { controls } = this.state;

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: e.currentTarget.value,
                valid: checkValidity(
                    controlName,
                    controls[controlName].validation
                ),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    };

    sumbitHandler = (e) => {
        e.preventDefault();

        const { email, password } = this.state.controls;

        this.props.onAuth(email.value, password.value);
    };

    render() {
        const formEls = [];
        const { controls } = this.state;
        const { isAuth, loading, authRedirectPath } = this.props;

        Object.keys(controls).forEach((el) => {
            const { type, placeholder } = controls[el].elementConfig;
            const { required } = controls[el].validation;
            const { elementType, value, valid, touched } = controls[el];

            const input = (
                <Input
                    key={placeholder}
                    type={type}
                    placeholder={placeholder}
                    elementType={elementType}
                    value={value}
                    touched={touched}
                    invalid={valid}
                    required={required}
                    changed={(e) => this.inputChangedHandler(e, el)}
                />
            );

            formEls.push(input);
        });

        let redirect = null;

        if (isAuth) {
            redirect = <Redirect to={authRedirectPath} />;
        }

        return (
            <React.Fragment>
                {redirect}
                <form
                    className={classes.Form}
                    onSubmit={(e) => this.sumbitHandler(e)}
                >
                    {formEls}
                    {loading ? <Preloader /> : <Button>Войти</Button>}
                </form>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
});

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    loading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Auth, axios));
