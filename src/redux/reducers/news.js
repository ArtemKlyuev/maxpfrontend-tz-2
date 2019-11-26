import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    news: null,
    loading: true,
    error: false
};

const fetchNewsStart = (state, action) =>
    updateObject(state, { loading: true, error: false });

const fetchNewsFail = (state, action) =>
    updateObject(state, { loading: false, error: true });

const fetchNewsSuccess = (state, action) =>
    updateObject(state, { news: action.news, loading: false, error: false });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NEWS_START:
            return fetchNewsStart(state, action);
        case actionTypes.FETCH_NEWS_SUCCESS:
            return fetchNewsSuccess(state, action);
        case actionTypes.FETCH_NEWS_FAIL:
            return fetchNewsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
