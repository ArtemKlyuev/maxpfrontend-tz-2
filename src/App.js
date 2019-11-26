import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Root from './components/Root/Root';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Profile from './components/Profile/Profile';
import News from './containers/News/News';
import NewsItemPage from './components/News/NewsItemPage/NewsItemPage';
import NotFound from './components/NotFound/NotFound';

const App = (props) => {
    let routes = (
        <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/news" exact component={News} />
            <Route path="/news/:id" component={NewsItemPage} />
            <Route path="/" exact component={Root} />
            {/* <Route path="*" component={NotFound} /> */}
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/login" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/profile" component={Profile} />
                <Route path="/news" exact component={News} />
                <Route path="/news/:id" component={NewsItemPage} />
                <Route path="/" exact component={Root} />
                <Route path="*" component={NotFound} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return <Layout>{routes}</Layout>;
};

const mapStateToPros = (state) => ({ isAuth: state.auth.isAuth });

export default connect(mapStateToPros)(App);
