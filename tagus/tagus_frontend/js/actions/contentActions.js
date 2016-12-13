import {constants} from '../constants';
import {lib} from '../tagus_lib';
import axios from '../axios';

let _shouldGetPageList = function(state) {
    //TODO: add more debug code
    return state.content.list.length === 0;
};


export function getContentListIfNeeded(){
    return function(dispatch, getState) {
        if( _shouldGetPageList(getState())) {
            dispatch( {
                type: constants.GET_CONTENT_LIST,
                payload: axios ('pages?contenttree=true').then(results =>{ return results;})
            })
        }
    }
};
