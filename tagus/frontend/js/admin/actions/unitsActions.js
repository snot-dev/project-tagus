import {constants} from '../../constants';
import axios from '../../axios';


let _shouldGetUnitsList = function(state) {
    return state.units.list.length === 0;
};

let _shouldGetUnitDetail = function(state, id) {
    //TODO: add more debug code

    return !state.units.detail._id || state.units.detail._id !== id;
};

export function getUnitDetailIfNeeded(id) {
    return (dispatch, getState) => {
        if(_shouldGetUnitDetail(getState(), id)) {
            dispatch({
                type: constants.units.GET_UNITS_DETAIL,
                payload: axios('units/' + id).then(results => {
                    return results;
                })
            });
        }
    };
};

export function getUnitsListIfNecessary(){
    return (dispatch, getState) => {
        if( _shouldGetUnitsList(getState())) {
            dispatch( {
                type: constants.units.GET_UNITS_LIST,
                payload: axios ('units').then(results =>{ return results;})
            })
        }
    }
};