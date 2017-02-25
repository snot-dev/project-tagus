import {constants} from '../../constants';
import axios from '../../axios';

let _shouldGetPageList = function(state) {
    //TODO: add more debug code
    return state.content.list.length === 0;
};

let _shouldGetPageDetail = function(state, id) {
    //TODO: add more debug code
    return !state.content.detail._id || state.content.detail._id !== id;
};

let _shouldGetContentUnit = function(state, id) {
    return !state.content.unit._id || state.content.unit._id !== id;
};

let _getContentUnitTypeIfNeeded = function(dispatch, state, id) {
    if(_shouldGetContentUnit(state, id)) {
        dispatch( {
            type: constants.GET_CONTENT_DETAIL_UNITTYPE,
            payload: axios('units/' + id).then( results => {
                return results
            })
        });
    }
};

export function getContentListIfNeeded(){
    return (dispatch, getState) => {
        if( _shouldGetPageList(getState())) {
            dispatch( {
                type: constants.content.GET_CONTENT_LIST,
                payload: axios ('pages?contenttree=true').then(results =>{ return results;})
            })
        }
    }
};

export function getContentDetailIfNeeded(id) {
    return (dispatch, getState) => {
        if(_shouldGetPageDetail(getState(), id)) {
            dispatch({
                type: constants.content.GET_CONTENT_DETAIL,
                payload: axios('pages/' + id).then(results => {
                    _getContentUnitTypeIfNeeded(dispatch, getState(), results.data.unitType.id);
                    return results;
                })
            });
        }
    };
};
