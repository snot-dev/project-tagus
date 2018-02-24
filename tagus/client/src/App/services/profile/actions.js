import {constants} from '../constants';
import axios from '../axios';

export function updateProfile(user) {  
    return (dispatch, getState) => {
        dispatch({
            type: constants.profile.UPDATE_PROFILE,
            payload: axios.put(`users/${user._id}`, user)
        });
    }
}
