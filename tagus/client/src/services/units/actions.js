import {constants} from '../constants';
import axios from '../axios';


let _shouldGetUnitsList = function(state) {
    return state.units.list.length === 0;
};

let _shouldGetUnitDetail = function(state, id) {
    //TODO: add more debug code

    return !state.units.detail._id || state.units.detail._id !== id;
};

export function getUnitDetailIfNeeded(id) {
    return (dispatch, getState) => {
        const state = getState();
        if(_shouldGetUnitDetail(state, id)) {
            if(state.units.dictionary[id]) {
                dispatch({
                    type: constants.units.GET_UNITS_DETAIL_FULFILLED,
                    payload:{
                        data: state.units.dictionary[id]
                    } 
                });
            }
            else {
                dispatch({
                    type: constants.units.GET_UNITS_DETAIL,
                    payload: axios('units/' + id)
                });
            }
        }
    };
};

export function getUnitsListIfNeeded(){
    return (dispatch, getState) => {
        if( _shouldGetUnitsList(getState())) {
            dispatch( {
                type: constants.units.GET_UNITS_LIST,
                payload: axios ('units')
            })
            .then(() => {
                dispatch({
                    type: constants.units.GET_UNITS_TEMPLATES,
                    payload: axios('templates')
                });
            });
        }
    }
};