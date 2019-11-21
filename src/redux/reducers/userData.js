import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userData: null,
    error: false,
    loading: true
};

const fetchUserDataStart = (state, action) =>
    updateObject(state, { error: false, loading: true });

const fetchUserDataSuccesss = (state, action) =>
    updateObject(state, {
        userData: action.data,
        error: false,
        loading: false
    });

const fetchUserDataFail = (state, action) =>
    updateObject(state, { error: true, loading: false });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DATA_START:
            return fetchUserDataStart(state, action);
        case actionTypes.FETCH_USER_DATA_SUCCESS:
            return fetchUserDataSuccesss(state, action);
        case actionTypes.FETCH_USER_DATA_FAIL:
            return fetchUserDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;
