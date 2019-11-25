import * as actionTypes from './actionTypes';
import axios from '../../shared/axiosInstance';

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

        const authData = { email, password };

        console.log('authData', authData);

        const response = await axios.post('/validate', authData);

        console.log('resData', response);

        const { status, data } = response.data;

        if (status !== 'ok') {
            throw new Error(response.message);
        }
        dispatch(authSuccess(data.id));
    } catch (e) {
        console.error('Auth error', e);
        dispatch(authFail());
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
