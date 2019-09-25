import axios from 'axios';

export function loginUser(userData) {
    return {
        type: 'LOGIN_USER',
        payload: userData
    }
}

export function getLoggedinUser() {
    return async function (dispatch) {
        const { data } = await axios.get('/loggedinUser');
        const userData = data.name && data.email ? data : {}
        dispatch(loginUser(userData));
    }
}