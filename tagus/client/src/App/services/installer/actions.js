import axios from '../axios';
import {constants} from '../constants';

export function checkIfInstall() {
    return (dispatch, getState) => {
        dispatch ({
            type: constants.installer.GET_INFO,
            payload: axios.get('info')
        }); 
    }
}

export function createAdmin(user) {
    return (dispatch, getState) => {
        user.isCreator = true;
        dispatch ({
            type: constants.installer.CREATE_ADMIN,
            payload: axios.post('auth/create', user)
        });
    };
}