import {constants} from '../constants';
import axios from '../axios';

const _shouldFetchUser = state => {
    return localStorage.getItem('user') && !state.auth.user._id && !state.auth.loggedIn;
}

export function login(user) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.auth.LOGIN,
            payload: axios.post('authenticate', user)
        });
    }
}

export function logoff() {
    return(dispatch, getState) => {
        dispatch({
            type: constants.auth.LOGOFF
        });
    }
}

export function getLoggedUser() {
    return (dispatch, getState) => {
        const state = getState();

        if (_shouldFetchUser(state)) {
            dispatch({
                type: constants.auth.GET_LOGGED_USER,
                payload: axios.get('authenticate')
            });
        }
    }
}