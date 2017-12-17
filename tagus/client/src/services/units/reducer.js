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
        case constants.units.ADDING_TAB: {
            newState.addingTab = !state.addingTab;
            return newState;
        }
        default:
            return state || {};   
    }
};