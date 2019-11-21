import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = (userId) => {
    console.log('auth success triggered');
    localStorage.setItem('isAuth', true);
    return { type: actionTypes.AUTH_SUCCESS, userId };
};

export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

export const auth = (email, password) => async (dispatch) => {
    try {
        dispatch(authStart());

        const url =
            'https://mysterious-reef-29460.herokuapp.com/api/v1/validate';

        const data = { email, password };

        console.log('authData', data);

        const authData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        };

        const res = await fetch(url, authData);
        const resData = await res.json();

        console.log('resData', resData);

        if (resData.status === 'ok') {
            dispatch(authSuccess(resData.data.userId));
        } else {
            throw new Error(resData.message);
        }
    } catch (e) {
        console.error('Auth error', e);
        dispatch(authFail(e));
    }
};

export const logout = () => {
    localStorage.setItem('isAuth', false);
    return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthState = () => (dispatch) => {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    if (!isAuth) {
        localStorage.setItem('isAuth', false);
    } else {
        dispatch(authSuccess());
    }
};

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
});
