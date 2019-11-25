import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ErrorBar from '../../components/UI/ErrorBar/ErrorBar';

const withErrorHandler = (WrappedComponent, axios) => {
    class Wrapper extends Component {
        state = { error: null };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    console.log('witherrorhandlerError', error.message);
                    this.setState({ error });
                    return error;
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            const { error } = this.state;
            const { authError } = this.props;
            let errorBar = null;

            let message = 'Имя пользователя или пароль введены не верно';

            if (error) {
                message = error.message;
            }

            if (error || authError) {
                errorBar = (
                    <ErrorBar show={error || authError}>{message}</ErrorBar>
                );
            }
            return (
                <Fragment>
                    {errorBar}
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }

    const mapStateToProps = (state) => ({ authError: state.auth.error });
    return connect(mapStateToProps)(Wrapper);
};

export default withErrorHandler;
