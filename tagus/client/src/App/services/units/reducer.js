import { constants } from '../constants';
import {convertArrayToDictionary} from '../helpers';

export let unitsReducer = function(state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.units.GET_UNITS_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.units.GET_UNITS_DETAIL_FULFILLED: {
            newState.fetchingList = false;
            newState.detail = action.payload.data;
            return newState;
        }

        case constants.units.GET_UNITS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.units.GET_UNITS_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.list = action.payload.data;
            newState.dictionary = convertArrayToDictionary(action.payload.data);
            return newState;
        }
        case constants.units.GET_UNITS_TEMPLATES_PENDING: {
            newState.fetchingTemplates = true;
            return newState;
        }
        case constants.units.GET_UNITS_TEMPLATES_FULFILLED: {
            newState.fetchingTemplates = false;
            newState.templates = action.payload.data;
            return newState;
        }
        case constants.units.GET_UNITS_FIELDS_PENDING: {
            newState.fetchingUnitFields = true;
            return newState;
        }
        case constants.units.GET_UNITS_FIELDS_FULFILLED: {
            newState.unitFields = action.payload.data;
            newState.fetchingUnitFields = false;
            return newState;
        }
        case constants.units.ADDING_TAB: {
            newState.addingTab = action.payload || !state.addingTab;
            return newState;
        }
        case constants.units.ADDING_FIELD: {
            newState.addingField = action.payload || false;
            return newState;
        }
        case constants.units.UPDATE_UNIT: {
            newState.detail = action.payload;
            return newState;
        }  
        case constants.units.POST_UNIT_DETAIL_PENDING: {
            newState.savingDetail = true;
        
            return newState;
        }
        case constants.units.POST_UNIT_DETAIL_FULFILLED: { 
            newState.detail = action.payload.data;
            newState.savingDetail = false;
            return newState;
        }
        case constants.units.CREATE_UNIT_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.units.CREATE_UNIT_FULFILLED: {
            newState.savingDetail = false;
            return newState;
        }
        default:
            return state || {};   
    }
};