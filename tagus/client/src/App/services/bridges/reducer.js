import { constants } from '../constants';
import {convertArrayToDictionary} from '../helpers';

export const bridgesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.bridges.GET_BRIDGES_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.list = action.payload.data;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_UNITS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_UNITS_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.units = convertArrayToDictionary(action.payload.data);
            return newState;
        }
        case constants.bridges.GET_BRIDGES_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_DETAIL_FULFILLED: {
            newState.fetchingDetail = false;
            newState.detail = action.payload.data;
            return newState;
        }
        case constants.bridges.POST_BRIDGES_DETAIL_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.bridges.POST_BRIDGES_DETAIL_FULFILLED: {
            newState.savingDetail = false;
            newState.detail = action.payload.data.result;
            return newState;
        }
        case constants.bridges.CREATE_BRIDGE_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.bridges.CREATE_BRIDGE_FULFILLED: {
            newState.savingDetail = false;
            return newState;
        }
        default:
            return state || {}; 
    }
}