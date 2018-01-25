import _ from 'lodash';
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
                //TODO: Check if should get the object from db or clone it like this
                dispatch({
                    type: constants.units.GET_UNITS_DETAIL_FULFILLED,
                    payload:{
                        data: _.cloneDeep(state.units.dictionary[id])
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

export function addField(tab) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.units.ADDING_FIELD,
            payload: tab
        });
    };
}

export function getTemplatesIfNeeded() {
    return (dispatch, getState) => {
        if(getState().units.templates.length === 0) {
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
    };
}

export function getUnitFieldsIfNeeded() {
    return (dispatch, getState) => {
        if(getState().units.unitFields.length === 0) {
            dispatch({
                type: constants.units.GET_UNITS_FIELDS,
                payload: axios('unitfields')
            });
        }
    };
}

export function addNewField(field, tab) {   
    return(dispatch, getState) => {
        const detail = getState().units.detail;
        let fieldTab;

        for(const t of detail.tabs) {
            if(t.alias === tab) {
                fieldTab = t;
                break;
            }
        }

        fieldTab.fields.push(field);

        dispatch({
            type: constants.units.UPDATE_UNIT,
            payload: detail
        });
    };
}

export function saveUnit(unit) {
    return(dispatch, getState) => {
        dispatch({
            type: constants.units.POST_UNIT_DETAIL,
            payload: axios.put(`units/${unit._id}`, unit)
        })
        .then(() => {
            dispatch( {
                type: constants.units.GET_UNITS_LIST,
                payload: axios ('units')
            });
        });
    };
}

export function resetUnit(id) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.units.GET_UNITS_DETAIL_FULFILLED,
            payload:{
                data: _.cloneDeep(getState().units.dictionary[id])
            } 
        });
    };
}

export function createNewUnit(unit) {
    return(dispatch, getState) => {
        dispatch({
            type: constants.units.CREATE_UNIT,
            payload: axios.post('units', unit)
        })
        .then(() => {
            dispatch( {
                type: constants.units.GET_UNITS_LIST,
                payload: axios ('units')
            });
        });
    }
}