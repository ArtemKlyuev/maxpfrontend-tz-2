import axios from '../../shared/axiosInstance';
import * as actionTypes from './actionTypes';

const fetchUserDataStart = () => ({
    type: actionTypes.FETCH_USER_DATA_START
});

const fetchUserDataSuccess = (data) => ({
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    data
});

const fetchUserDataFail = (error) => ({
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error
});

export const fetchUserData = () => async (dispatch, getState) => {
    dispatch(fetchUserDataStart());
    const { userId } = getState().auth;

    try {
        const response = await axios.get(`/user-info/${userId}`);
        const { status, data, social } = response.data;

        if (status !== 'ok') {
            throw new Error(response.message);
        }

        dispatch(fetchUserDataSuccess({ ...data, ...social }));
    } catch (error) {
        console.log('user data error', error);
        dispatch(fetchUserDataFail(error));
    }
};
