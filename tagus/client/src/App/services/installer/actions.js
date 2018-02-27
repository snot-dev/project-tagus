import axios from '../axios';
import {constants} from '../constants';

export function checkIfInstall() {
    return (dispatch, getState) => {
        dispatch({
            type: constants.installer.GET_INFO,
            payload: axios.get('info')
        }); 
    }
}