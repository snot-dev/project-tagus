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
            });
        }
    };
};

export function addTab(adding) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.units.ADDING_TAB,
            payload: adding
        });
    };
}

export function getTemplatesIfNeeded() {
    return (dispatch, getState) => {
        if(getState().units.templates.length === 0) {
            console.warn("ah rooz!");
            dispatch({
                type: constants.units.GET_UNITS_TEMPLATES,
                payload: axios('templates')
            });
        }
    };
}

export function updateUnit(values) {
    return (dispatch, getState) => {
        const state = getState();
        const newDetail = Object.assign(state.units.detail, values);

        dispatch({
            type: constants.units.UPDATE_UNIT,
            payload: newDetail
        });
    };
}

export function addNewTab(tab) {
    return (dispatch, getState) => {
        const detail = getState().units.detail;
        detail.tabs.push(tab);

        dispatch({
            type: constants.units.UPDATE_UNIT,
            payload: detail
        });
    }
}