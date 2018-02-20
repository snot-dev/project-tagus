import {constants} from '../constants';
import axios from '../axios';

export function login(user) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.auth.LOGIN,
            payload: axios.post('authenticate', user)
        });
    }
}