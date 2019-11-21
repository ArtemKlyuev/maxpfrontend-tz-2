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

export const fetchUserData = () => {
    return (dispatch) => {
        dispatch(fetchUserDataStart());
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                if (!res.ok) {
                    console.log('res.statusText', res);
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log('data', data);
                dispatch(fetchUserDataSuccess(data));
            })
            .catch((err) => {
                console.log('user data error', err);
                dispatch(fetchUserDataFail(err));
            });
    };
};
