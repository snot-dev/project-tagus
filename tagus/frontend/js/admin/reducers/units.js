import { constants } from '../../constants';

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
            return newState;
        }
        default:
            return state || {};   
    }
};