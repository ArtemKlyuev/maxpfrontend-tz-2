import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ErrorBar from '../../components/UI/ErrorBar/ErrorBar';

const withErrorHandler = (WrappedComponent, axios) => {
    class Wrapper extends Component {
        state = { generalError: null, showError: false };

        componentDidUpdate(prevProps) {
            const { generalError } = this.state;
            const {
                authError: prevAuthError,
                userDataError: prevUserDataError
            } = prevProps;

            const { authError, userDataError } = this.props;

            const prevIsError =
                Boolean(generalError) || prevAuthError || prevUserDataError;

            const isError = Boolean(generalError) || authError || userDataError;

            console.log({ generalError, authError, userDataError });

            if (prevIsError !== isError) {
                this.setState({ showError: isError });
            }
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ generalError: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    console.log('witherrorhandlerError', error.message);
                    this.setState({
                        gerenalError: error.message,
                        showError: true
                    });
                    return error;
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        showErrorMsg = () => {
            const { gerenalError } = this.state;
            const { authError, userDataError } = this.props;

            let message = null;

            //gerenalError is a string

            switch (true) {
                case Boolean(gerenalError):
                    message = gerenalError;
                    break;
                case authError:
                    message = 'Имя пользователя или пароль введены не верно';
                    break;
                case userDataError:
                    message = 'Пользователь не найден';
                    break;

                default:
                    message = '';
            }

            return message;
        };

        render() {
            const { showError } = this.state;
            return (
                <Fragment>
                    <ErrorBar show={showError}>{this.showErrorMsg()}</ErrorBar>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }

    const mapStateToProps = (state) => ({
        authError: state.auth.error,
        userDataError: state.userData.error
    });

    return connect(mapStateToProps)(Wrapper);
};

export default withErrorHandler;
