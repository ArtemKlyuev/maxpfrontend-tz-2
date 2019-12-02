import axios from '../../shared/axiosInstance';
import * as actionTypes from './actionTypes';

export const fetchNewsStart = () => ({ type: actionTypes.FETCH_NEWS_START });

export const fetchNewsFail = () => ({ type: actionTypes.FETCH_NEWS_FAIL });

export const fetchNewsSuccess = (news) => ({
    type: actionTypes.FETCH_NEWS_SUCCESS,
    news
});

export const fetchNews = () => async (dispatch) => {
    dispatch(fetchNewsStart());

    try {
        const response = await axios.get('/news');
        const { status, data } = response.data;

        if (status !== 'ok') {
            throw new Error(response.message);
        }

        dispatch(fetchNewsSuccess(data));
    } catch (error) {
        console.error('News fetch error', error);
        dispatch(fetchNewsFail());
    }
};
