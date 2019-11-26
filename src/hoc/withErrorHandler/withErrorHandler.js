import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ErrorBar from '../../components/UI/ErrorBar/ErrorBar';

const withErrorHandler = (WrappedComponent, axios) => {
    class Wrapper extends Component {
        state = { error: null, showError: false };

        componentDidUpdate(prevProps) {
            const { error } = this.state;
            const {
                authError: prevAuthError,
                userDataError: prevUserDataError
            } = prevProps;

            const { authError, userDataError } = this.props;

            const prevIsError =
                Boolean(error) || prevAuthError || prevUserDataError;

            const isError = Boolean(error) || authError || userDataError;

            console.log({ error, authError, userDataError });

            console.log('prevIsError', prevIsError);
            console.log('isError', isError);
            console.log('Boolean(error)', Boolean(error));

            if (prevIsError !== isError) {
                this.setState({ showError: isError });
            }
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    console.log('witherrorhandlerError', error.message);
                    this.setState({ error: error.message, showError: true });
                    return error;
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        showError = () => {
            const { error, showError } = this.state;
            const { authError, userDataError } = this.props;
            const errors = { error, authError, userDataError };

            let message = null;

            switch (true) {
                case error:
                    message = error;
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
            console.log('errors', typeof error);
            console.log('this.state errors', this.state);

            return <ErrorBar show={showError}>{message}</ErrorBar>;
        };

        render() {
            return (
                <Fragment>
                    {this.showError()}
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
