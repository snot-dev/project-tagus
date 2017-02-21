import {constants} from '../../constants';
import axios from '../../axios';

export function saveUser(user){
    return (dispatch, getState) => {
        dispatch( {
            type: constants.user.SAVING_USER,
            payload: axios.post('initializer', user).then(results =>{ return results;})
        })
    }
};