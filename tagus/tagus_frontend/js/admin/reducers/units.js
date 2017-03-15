import { constants } from '../../constants';

export let unitsReducer = function(state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case constants.units.GET_UNITS_DETAIL_PENDING: {
            newState.fetchingUnitsDetail = true;
            return newState;
        }
        case constants.units.GET_UNITS_DETAIL_FULFILLED: {
            newState.fetchingUnitsList = false;
            newState.detail = action.payload.data;
            return newState;
        }

        case constants.units.GET_UNITS_LIST_PENDING: {
            newState.fetchingUnitsList = true;
            return newState;
        }
        case constants.units.GET_UNITS_LIST_FULFILLED: {
            newState.fetchingUnitsList = false;
            newState.list = action.payload.data;
            return newState;
        }
        default:
            return state || {};   
    }
};