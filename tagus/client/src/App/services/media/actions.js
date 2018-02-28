import {constants} from '../constants';
import axios from '../axios';

export function getMedia(){
    return (dispatch, getState) => {
        if(getState().media.list.length === 0) {
            dispatch({
                type: constants.media.GET_MEDIA,
                payload: axios('media')
            });
        }
    };
};