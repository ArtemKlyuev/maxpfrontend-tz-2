import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialstate = {
    isAuth: false,
    error: null,
    loading: false,
    authRedirectPath: '/',
    userId: null
};

const authStart = (state, action) =>
    updateObject(state, { loading: true, error: false });

const authSuccess = (state, action) =>
    updateObject(state, {
        isAuth: true,
        error: null,
        loading: false,
        userId: action.userId
    });

const authFail = (state, action) =>
    updateObject(state, { error: true, loading: false });

const authRedirectPath = (state, action) =>
    updateObject(state, { authRedirectPath: action.path });

const logout = (state, action) => updateObject(state, { isAuth: false });

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return authRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;
