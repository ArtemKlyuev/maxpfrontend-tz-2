import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../redux/actions/userData';
import UserProfile from '../../components/UserProfile/UserProfile';
import Preloader from '../UI/Preloader/Preloader';

class Profile extends React.Component {
    componentDidMount() {
        const { userData, isAuth } = this.props;
        if (isAuth && !userData) {
            this.props.onFetchUserData();
        }
    }

    render() {
        const { isAuth, error, userData, loading } = this.props;
        let redirect = null;
        let userProfile = <UserProfile {...userData} />;

        if (loading) {
            userProfile = <Preloader />;
        }

        console.log('this.props', this.props);

        if (!isAuth) {
            redirect = <Redirect to="/login" />;
        }

        return (
            <React.Fragment>
                {redirect}
                {!error && userProfile}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onFetchUserData: () => dispatch(actions.fetchUserData())
});

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userData: state.userData.userData,
    error: state.userData.error,
    loading: state.userData.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
