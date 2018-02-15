import {constants} from '../constants';
import axios from '../axios';

const _shouldGetTranslatesList = state => {
    return state.translates.list;
};

export function getListIfNedeed() {  
    return (dispatch, getState) => {
        if(_shouldGetTranslatesList(getState())) {
            dispatch({
                type: constants.translates.GET_TRANSLATES_LIST,
                payload: axios.get('/translates')
            });
        }
    };
};